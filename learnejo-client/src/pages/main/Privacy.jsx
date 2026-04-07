import { Card, CardBody, CardHeader, Divider } from '@heroui/react';

export default function Privacy() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-10 px-4">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Privacy Policy
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                    Your privacy is our priority.
                </p>
                <Divider className="my-8" />
            </header>

            <section className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
                    <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                    <p>
                        We collect personal information such as your name, email, and billing details to
                        provide our services effectively. This data is stored securely.
                    </p>

                    <h2 className="text-2xl font-bold">2. How We Use Your Data</h2>
                    <p>
                        Your data is used to personalize your learning experience, communicate important
                        updates, and process payments. We never sell your data to third parties.
                    </p>

                    <h2 className="text-2xl font-bold">3. Security Measures</h2>
                    <p>
                        We use industry-standard encryption and security protocols to protect your
                        information from unauthorized access.
                    </p>

                    <h2 className="text-2xl font-bold">4. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal data at any
                        time through your account settings.
                    </p>
                </div>
            </section>
        </div>
    );
}
