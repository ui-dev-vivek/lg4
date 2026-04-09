import { Card, CardBody, CardHeader, Divider, Chip } from '@heroui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faEye, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SEO from '../../components/layout/SEO';

export default function About() {
    return (
        <div className="max-w-5xl mx-auto space-y-16 py-16 px-4">
            <SEO title="About Us" />

            <header className="text-center space-y-6">
                <Chip
                    variant="flat"
                    color="primary"
                    className="px-4 py-1 h-auto font-black text-xs uppercase tracking-[0.2em]"
                >
                    Our Story
                </Chip>
                <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 dark:text-white tracking-tighter leading-tight">
                    Powering the <br />
                    <span className="text-primary-600">Next Generation.</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Learnejo isn't just a platform; it's a movement to make premium tech education
                    accessible to every student across the globe.
                </p>
            </header>

            <Divider className="opacity-50" />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 border-none shadow-sm bg-white dark:bg-gray-900 rounded-[32px] group hover:shadow-xl transition-all duration-500">
                    <CardHeader className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                            <FontAwesomeIcon icon={faBullseye} className="text-xl" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Our Mission</h3>
                    </CardHeader>
                    <CardBody className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-lg pt-4">
                        To provide high-quality, accessible tech education to everyone, everywhere.
                        We believe that financial barriers should never stop a curious mind from learning the skills of tomorrow.
                    </CardBody>
                </Card>

                <Card className="p-8 border-none shadow-sm bg-white dark:bg-gray-900 rounded-[32px] group hover:shadow-xl transition-all duration-500">
                    <CardHeader className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <FontAwesomeIcon icon={faEye} className="text-xl" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Our Vision</h3>
                    </CardHeader>
                    <CardBody className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-lg pt-4">
                        To become the world's most trusted ecosystem for student growth,
                        bridging the gap between academic learning and industry standards through premium verified resources.
                    </CardBody>
                </Card>
            </section>

            <section className="bg-gray-50 dark:bg-gray-950/40 p-12 md:p-16 rounded-[40px] border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-[80px] -mr-32 -mt-32 rounded-full" />

                <div className="relative space-y-8">
                    <h2 className="text-3xl md:text-4xl font-[1000] text-gray-900 dark:text-white tracking-tight">
                        Why Thousands Choose <span className="text-primary-600">Learnejo?</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            "Expert-vetted premium content",
                            "100% Verified coupon updates",
                            "Built for employability",
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <FontAwesomeIcon icon={faCheckCircle} className="text-primary-600 text-2xl" />
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-300 leading-snug">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
