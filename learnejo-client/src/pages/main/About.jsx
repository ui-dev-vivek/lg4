import { Card, CardBody, CardHeader, Divider } from '@heroui/react';

export default function About() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-10">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    About Learnejo
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Revolutionizing tech education through interactive learning.
                </p>
                <Divider className="my-8" />
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-6">
                    <CardHeader className="text-2xl font-bold text-primary-600">Our Mission</CardHeader>
                    <CardBody className="text-gray-600 dark:text-gray-300">
                        To provide high-quality, accessible tech education to everyone, everywhere.
                        We believe in learning by doing, which is why our platform focuses on
                        practical, hands-on projects.
                    </CardBody>
                </Card>

                <Card className="p-6">
                    <CardHeader className="text-2xl font-bold text-primary-600">Our Vision</CardHeader>
                    <CardBody className="text-gray-600 dark:text-gray-300">
                        To become the world's leading platform for developer growth, connecting
                        learners with industry-standard tools and a supportive community.
                    </CardBody>
                </Card>
            </section>

            <section className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                        <span>Expert-led courses and certifications.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                        <span>Built with modern technologies like Hero UI and Tailwind 4.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                        <span>A focus on real-world employability.</span>
                    </li>
                </ul>
            </section>
        </div>
    );
}
