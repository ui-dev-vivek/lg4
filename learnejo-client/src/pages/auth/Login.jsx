import { useState } from 'react';
import { Button, Input, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate an API call
        setTimeout(() => {
            login({ id: 1, name: 'Vivek', email: 'vivek@example.com' }, 'dummy-jwt-token');
            setLoading(false);
            navigate(from, { replace: true });
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <Card className="w-full max-w-sm shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <CardHeader className="flex flex-col gap-1 items-center justify-center py-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300">
                        Login to Learnejo
                    </h2>
                    <p className="text-gray-500 text-sm">Welcome back!</p>
                </CardHeader>
                <Divider />
                <CardBody className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                            isRequired
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            variant="bordered"
                            isRequired
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            size="lg"
                            isLoading={loading}
                            className="font-bold"
                        >
                            Sign In
                        </Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-600 dark:text-primary-400 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
