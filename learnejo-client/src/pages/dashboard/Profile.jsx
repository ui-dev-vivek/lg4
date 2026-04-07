import { Card, CardBody, CardHeader, Avatar, Button, Input, Divider } from '@heroui/react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto py-8 space-y-8">
            <header className="flex flex-col items-center md:flex-row md:items-end gap-6">
                <Avatar
                    src={user?.avatar}
                    name={user?.name}
                    className="w-32 h-32 text-4xl shadow-xl"
                    isBordered
                    color="primary"
                />
                <div className="flex-1 space-y-2 text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        {user?.name || 'User Profile'}
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        {user?.email || 'user@example.com'}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold">
                            Full Access
                        </span>
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold">
                            Educator
                        </span>
                    </div>
                </div>
                <Button color="primary" variant="shadow" className="font-bold">
                    Edit Profile
                </Button>
            </header>

            <Divider />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-lg border-none bg-white dark:bg-gray-900">
                    <CardHeader className="flex flex-col items-start px-6 pt-6">
                        <h2 className="text-xl font-bold">Personal Information</h2>
                        <p className="text-sm text-gray-500">Update your personal details here.</p>
                    </CardHeader>
                    <CardBody className="space-y-4 p-6">
                        <Input label="Full Name" defaultValue={user?.name} variant="bordered" />
                        <Input label="Email Address" defaultValue={user?.email} variant="bordered" readOnly />
                        <Input label="Location" placeholder="e.g. San Francisco, CA" variant="bordered" />
                    </CardBody>
                </Card>

                <Card className="shadow-lg border-none bg-white dark:bg-gray-900">
                    <CardHeader className="flex flex-col items-start px-6 pt-6">
                        <h2 className="text-xl font-bold">Account Security</h2>
                        <p className="text-sm text-gray-500">Manage your password and security settings.</p>
                    </CardHeader>
                    <CardBody className="space-y-4 p-6">
                        <Button color="secondary" variant="flat" fullWidth className="font-semibold">
                            Change Password
                        </Button>
                        <Button color="primary" variant="flat" fullWidth className="font-semibold">
                            Enable 2FA
                        </Button>
                        <Divider className="my-2" />
                        <p className="text-xs text-gray-400 text-center">
                            Last password change: 3 months ago
                        </p>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
}
