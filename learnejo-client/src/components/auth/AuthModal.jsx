import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Divider
} from '@heroui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';
import { motion } from 'framer-motion';
import { authService } from '../../services/authService';

export default function AuthModal({ isOpen, onClose }) {
    const handleLogin = async (provider) => {
        try {
            const response = await authService.socialLogin(provider.key);

            // Open the URL in a new small centered window
            const width = 500;
            const height = 650;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            window.open(
                response.authorization_url,
                "social_login_window",
                `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
            );
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    const socialProviders = [
        {
            name: 'Google',
            key: 'google',
            icon: faGoogle,
            color: 'bg-red-500',
            hover: 'hover:bg-red-600',
            textColor: 'text-white'
        },
        {
            name: 'GitHub',
            key: 'github',
            icon: faGithub,
            color: 'bg-gray-900',
            hover: 'hover:bg-black',
            textColor: 'text-white'
        },
        {
            name: 'LinkedIn',
            key: 'linkedin',
            icon: faLinkedin,
            color: 'bg-blue-700',
            hover: 'hover:bg-blue-800',
            textColor: 'text-white'
        }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            backdrop="blur"
            placement="center"
            className="p-4"
            size="md"
        >
            <ModalContent className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 shadow-2xl">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 items-center pt-10 pb-6">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <Logo />
                            </motion.div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2">
                                Accelerate your tech career
                            </p>
                        </ModalHeader>
                        <ModalBody className="px-10 pb-10">
                            <div className="text-center space-y-2 mb-8">
                                <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                                    Sign In to Learnejo
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                                    Join the leading platform for tech education and start building your future today.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {socialProviders.map((provider, index) => (
                                    <motion.div
                                        key={provider.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Button
                                            className={`w-full py-6 font-bold text-base transition-all duration-300 ${provider.color} ${provider.hover} ${provider.textColor} shadow-lg`}
                                            startContent={<FontAwesomeIcon icon={provider.icon} className="text-xl" />}
                                            onClick={() => handleLogin(provider)}
                                        >
                                            Continue with {provider.name}
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <FontAwesomeIcon icon={faRocket} className="text-primary-500" />
                                <span>Secured by modern OAuth standards</span>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex flex-col items-center pb-8 pt-0">
                            <Divider className="mb-6 bg-gray-100 dark:bg-gray-900 w-full" />
                            <p className="text-xs text-gray-500 text-center px-8 leading-relaxed">
                                By signing in, you agree to our
                                <a href="/terms" className="text-primary-600 font-bold mx-1 hover:underline">Terms of Service</a>
                                and
                                <a href="/privacy" className="text-primary-600 font-bold mx-1 hover:underline">Privacy Policy</a>
                            </p>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
