import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)


def log_auth_event(user_id: int, provider: str, action: str, ip_address: str = None):
    logger.info(f"Auth Event - User: {user_id}, Provider: {provider}, Action: {action}, IP: {ip_address}")


def log_error(error_msg: str, exception: Exception = None):
    if exception:
        logger.error(f"{error_msg}: {str(exception)}")
    else:
        logger.error(error_msg)
