import { Card, CardBody, CardHeader, Divider } from '@heroui/react';

export default function Terms() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-10 px-4">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Terms & Conditions
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">
                    Last updated: April 3, 2026
                </p>
                <Divider className="my-8" />
            </header>

            <section className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
                <h2 className="text-2xl font-bold mb-6">User Agreement</h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400">
                    <h3 className="text-xl font-bold">1. Usage Rights</h3>
                    <p>
                        By using Learnejo, you agree to comply with our usage standards and respect copyright laws.
                        You are granted a non-exclusive license to use the platform for personal learning.
                    </p>

                    <h3 className="text-xl font-bold">2. Payment & Subscriptions</h3>
                    <p>
                        Certain features are only available to premium subscribers. All payments are securely
                        processed, and we do not store sensitive credit card information.
                    </p>

                    <h3 className="text-xl font-bold">3. Acceptable Conduct</h3>
                    <p>
                        You may not use the platform for any illegal activities or to harass others.
                        We reserve the right to suspend accounts that violate these terms.
                    </p>

                    <h3 className="text-xl font-bold">4. Limitation of Liability</h3>
                    <p>
                        Learnejo is provided "as is" without warranty. We are not responsible for
                        any direct or indirect damages arising from the use of our services.
                    </p>
                </div>
            </section>
        </div>
    );
}
