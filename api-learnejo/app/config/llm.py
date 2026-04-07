"""
Centralized LLM Service for Multi-Provider Support (LangChain Integration)

Supports: Groq, OpenRouter, OpenAI via LangChain
Features: Streaming, Non-streaming, Provider auto-detection
"""

from typing import Optional, AsyncGenerator, List, Dict, Any
from enum import Enum

from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage, BaseMessage
from langchain_core.language_models.chat_models import BaseChatModel

from app.config.settings import settings


class LLMProvider(str, Enum):
    GROQ = "groq"
    OPENROUTER = "openrouter"
    OPENAI = "openai"


class LLMService:
    """
    Centralized service for LLM interactions across multiple providers using LangChain.
    
    Usage:
        # Auto-detect provider
        service = LLMService()
        
        # Explicit provider
        service = LLMService(provider=LLMProvider.GROQ)
        
        # Non-streaming
        response = await service.ainvoke("Hello!")
        
        # Streaming
        async for chunk in service.get_streaming_completion("Hello!"):
            print(chunk, end="")
    """
    
    def __init__(self, provider: Optional[LLMProvider] = None, model: Optional[str] = None):
        """
        Initialize LLM service with optional provider and model override.
        
        Args:
            provider: Explicit provider selection (auto-detect if None)
            model: Model override (uses provider default if None)
        """
        self.provider = provider or self._detect_provider()
        self.model = model or self._get_default_model()
        self.llm = self._initialize_llm()
        
    def _detect_provider(self) -> LLMProvider:
        """Auto-detect provider based on environment variables."""
        # Explicit provider setting takes precedence
        if settings.LLM_PROVIDER:
            provider_map = {
                "groq": LLMProvider.GROQ,
                "openrouter": LLMProvider.OPENROUTER,
                "openai": LLMProvider.OPENAI,
            }
            return provider_map.get(settings.LLM_PROVIDER.lower(), LLMProvider.GROQ)
        
        # Auto-detect based on available API keys (priority: Groq > OpenRouter > OpenAI)
        if settings.GROQ_API_KEY:
            return LLMProvider.GROQ
        elif settings.OPEN_ROUTER_API_KEY:
            return LLMProvider.OPENROUTER
        elif settings.OPENAI_API_KEY:
            return LLMProvider.OPENAI
        else:
            raise ValueError(
                "No LLM provider configured. Please set one of: "
                "GROQ_API_KEY, OPEN_ROUTER_API_KEY, or OPENAI_API_KEY in .env"
            )
    
    def _get_default_model(self) -> str:
        """Get default model for the selected provider."""
        if self.provider == LLMProvider.GROQ:
            return settings.GROQ_MODEL
        elif self.provider == LLMProvider.OPENROUTER:
            return settings.LLM_MODEL
        else:  # OpenAI
            return "gpt-3.5-turbo"
    
    def _initialize_llm(self) -> BaseChatModel:
        """Initialize the appropriate LangChain LLM based on provider."""
        if self.provider == LLMProvider.GROQ:
            return ChatGroq(
                api_key=settings.GROQ_API_KEY,
                model=self.model,
                temperature=0.7,
                max_tokens=None,
                timeout=None,
                max_retries=2,
            )
        
        elif self.provider == LLMProvider.OPENROUTER:
            return ChatOpenAI(
                api_key=settings.OPEN_ROUTER_API_KEY,
                base_url=settings.OPENROUTER_BASE_URL,
                model=self.model,
                temperature=0.7,
            )
        
        else:  # OpenAI
            return ChatOpenAI(
                api_key=settings.OPENAI_API_KEY,
                model=self.model,
                temperature=0.7,
            )
    
    def _convert_messages(self, messages: List[Dict[str, str]]) -> List[BaseMessage]:
        """Convert dict messages to LangChain message objects."""
        langchain_messages = []
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            
            if role == "system":
                langchain_messages.append(SystemMessage(content=content))
            elif role == "assistant":
                langchain_messages.append(AIMessage(content=content))
            else:  # user
                langchain_messages.append(HumanMessage(content=content))
        
        return langchain_messages
    
    async def ainvoke(
        self,
        prompt: str = "",
        messages: Optional[List[Dict[str, str]]] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """
        Get a non-streaming completion from the LLM.
        
        Args:
            prompt: User prompt (used if messages is None)
            messages: Full message history (overrides prompt if provided)
            temperature: Sampling temperature (overrides default)
            max_tokens: Maximum completion tokens
            **kwargs: Additional provider-specific parameters
            
        Returns:
            Complete response text
        """
        try:
            # Prepare messages
            if messages is None:
                messages = [{"role": "user", "content": prompt}]
            
            langchain_messages = self._convert_messages(messages)
            
            # Update LLM parameters if provided
            llm = self.llm
            if temperature is not None or max_tokens is not None or kwargs:
                llm_kwargs = {}
                if temperature is not None:
                    llm_kwargs["temperature"] = temperature
                if max_tokens is not None:
                    llm_kwargs["max_tokens"] = max_tokens
                llm_kwargs.update(kwargs)
                llm = llm.bind(**llm_kwargs)
            
            # Get completion
            response = await llm.ainvoke(langchain_messages)
            return response.content
        
        except Exception as e:
            raise Exception(f"LLM completion failed ({self.provider}): {str(e)}")
    
    async def get_streaming_completion(
        self,
        prompt: str = "",
        messages: Optional[List[Dict[str, str]]] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> AsyncGenerator[str, None]:
        """
        Get a streaming completion from the LLM.
        
        Args:
            prompt: User prompt (used if messages is None)
            messages: Full message history (overrides prompt if provided)
            temperature: Sampling temperature (overrides default)
            max_tokens: Maximum completion tokens
            **kwargs: Additional provider-specific parameters
            
        Yields:
            Text chunks as they arrive
        """
        try:
            # Prepare messages
            if messages is None:
                messages = [{"role": "user", "content": prompt}]
            
            langchain_messages = self._convert_messages(messages)
            
            # Update LLM parameters if provided
            llm = self.llm
            if temperature is not None or max_tokens is not None or kwargs:
                llm_kwargs = {}
                if temperature is not None:
                    llm_kwargs["temperature"] = temperature
                if max_tokens is not None:
                    llm_kwargs["max_tokens"] = max_tokens
                llm_kwargs.update(kwargs)
                llm = llm.bind(**llm_kwargs)
            
            # Stream completion
            async for chunk in llm.astream(langchain_messages):
                if hasattr(chunk, 'content') and chunk.content:
                    yield chunk.content
        
        except Exception as e:
            raise Exception(f"LLM streaming failed ({self.provider}): {str(e)}")
    
    def get_llm(self) -> BaseChatModel:
        return self.llm
    
    def get_provider_info(self) -> Dict[str, Any]:
        return {
            "provider": self.provider.value,
            "model": self.model,
            "api_key_set": bool(self._get_api_key()),
            "langchain_class": self.llm.__class__.__name__,
        }
    
    def _get_api_key(self) -> str:
        """Get API key for current provider."""
        if self.provider == LLMProvider.GROQ:
            return settings.GROQ_API_KEY
        elif self.provider == LLMProvider.OPENROUTER:
            return settings.OPEN_ROUTER_API_KEY
        else:
            return settings.OPENAI_API_KEY


# Convenience function for quick usage
async def get_llm_response(prompt: str, **kwargs) -> str:
    service = LLMService()
    return await service.ainvoke(prompt, **kwargs)


# Helper to get LangChain LLM instance directly
def get_langchain_llm(provider: Optional[LLMProvider] = None, model: Optional[str] = None) -> BaseChatModel:
    service = LLMService(provider=provider, model=model)
    return service.get_llm()

llm = LLMService()
