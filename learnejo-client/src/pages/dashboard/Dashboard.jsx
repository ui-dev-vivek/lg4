import { Card, CardBody, CardHeader, Divider, Button } from '@heroui/react';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center space-y-12">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Study Dashboard
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Welcome back, <span className="text-primary-600 font-bold underline">{user?.name}</span>!
                </p>
                <Divider className="my-4" />
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-8">
                <Card className="hover:scale-105 transition-transform duration-300">
                    <CardHeader className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-lg">C</span>
                        </div>
                        <p className="text-lg font-bold">Courses In Progress</p>
                    </CardHeader>
                    <CardBody>
                        <p className="text-gray-500">You have <span className="font-bold underline text-primary-600">3</span> courses currently in progress.</p>
                        <Button
                            className="mt-6 font-bold"
                            color="secondary"
                            fullWidth
                            size="lg"
                            variant="flat"
                        >
                            View All
                        </Button>
                    </CardBody>
                </Card>

                <Card className="hover:scale-105 transition-transform duration-300">
                    <CardHeader className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-bold text-lg">A</span>
                        </div>
                        <p className="text-lg font-bold">Achievements</p>
                    </CardHeader>
                    <CardBody>
                        <p className="text-gray-500">You've earned <span className="font-bold underline text-primary-600">12</span> certificates so far!</p>
                        <Button
                            className="mt-6 font-bold"
                            color="primary"
                            fullWidth
                            size="lg"
                            variant="flat"
                        >
                            View Certificates
                        </Button>
                    </CardBody>
                </Card>

                <Card className="hover:scale-105 transition-transform duration-300 shadow-xl border-2 border-dashed border-primary-200">
                    <CardBody className="flex flex-col items-center justify-center p-8 space-y-4">
                        <p className="text-gray-500">Need some help or support?</p>
                        <Button
                            className="font-bold bg-primary-600 hover:bg-primary-700 text-white"
                            fullWidth
                            size="lg"
                        >
                            Contact Support
                        </Button>
                        <Button
                            className="font-bold"
                            color="danger"
                            fullWidth
                            size="lg"
                            variant="light"
                            onClick={logout}
                        >
                            Log Out
                        </Button>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
}
