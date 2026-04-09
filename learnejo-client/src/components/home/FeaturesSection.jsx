import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Chip, Divider } from '@heroui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCheck,
    faFileSignature,
    faBriefcase,
    faGraduationCap,
    faRobot,
    faArrowRight,
    faCheckDouble,
    faRocket,
    faShieldHalved,
    faBolt
} from '@fortawesome/free-solid-svg-icons';

const features = [
    {
        icon: faCalendarCheck,
        title: "Daily Tasks",
        description: "Build a habit of excellence. Get personalized daily coding & soft-skill challenges.",
        badge: "Streak",
        link: "/tasks"
    },
    {
        icon: faFileSignature,
        title: "Mock Tests",
        description: "Simulate real exam environments. Take industry-standard tests designed by experts.",
        badge: "Expert",
        link: "/mock-tests"
    },
    {
        icon: faBriefcase,
        title: "Preparation Kit",
        description: "Hand-picked guides, cheatsheets, and project roadmaps for every tech stack.",
        badge: "All-in-One",
        link: "/prep-kit"
    },
    {
        icon: faGraduationCap,
        title: "Free Courses",
        description: "Daily updated 100% OFF coupons for premium Udemy courses.",
        badge: "Daily",
        link: "/courses"
    },
    {
        icon: faRobot,
        title: "AI Mock Interview",
        description: "Ace your next interview with our AI expert that gives instant feedback.",
        badge: "AI Powered",
        link: "/ai-interview"
    },
    {
        icon: faRocket,
        title: "Career Services",
        description: "Mentorship, job referrals, and career coaching from industry professionals.",
        badge: "Mentorship",
        link: "/career"
    }
];

export default function FeaturesSection() {
    return (
        <div className="space-y-16">
            {/* Main Features Section */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                            One Platform. <span className="text-primary-600">Infinite Possibilities.</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                            Every tool you need to transition from student to professional.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl"
                                isPressable
                            >
                                <CardHeader className="flex flex-col items-start px-6 pt-8 pb-2">
                                    <div className="w-full flex justify-between items-center mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                            <FontAwesomeIcon icon={feature.icon} className="text-xl" />
                                        </div>
                                        {feature.badge && (
                                            <div className="relative">
                                                {feature.badge === "Daily" && (
                                                    <span className="absolute -inset-1 bg-primary-400 rounded-full animate-ping opacity-20" />
                                                )}
                                                <Chip color="primary" variant="flat" size="sm" className="font-bold text-[10px] uppercase relative">
                                                    {feature.badge}
                                                </Chip>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight">{feature.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </CardHeader>
                                <CardBody className="px-6 pb-8 pt-2">
                                    <Divider className="mb-4 opacity-30" />
                                    <Button
                                        as={Link}
                                        to={feature.link}
                                        variant="light"
                                        color="primary"
                                        className="w-full font-black h-12 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-sm uppercase tracking-wider"
                                        endContent={<FontAwesomeIcon icon={faArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />}
                                    >
                                        Explore Feature
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simplified Trust Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-950/40 rounded-3xl border border-gray-100 dark:border-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                                Built for <span className="text-primary-600">Students.</span>
                            </h2>
                            <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto lg:mx-0">
                                Premium resources combined with a roadmap that leads to real results.
                            </p>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <FontAwesomeIcon icon={faBolt} className="text-orange-500" />
                                    <span className="text-sm font-bold">Real-time Updates</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <FontAwesomeIcon icon={faShieldHalved} className="text-blue-500" />
                                    <span className="text-sm font-bold">100% Verified</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-primary-600 rounded-2xl text-white text-center">
                                <div className="text-2xl font-black">50K+</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Students</div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-950 rounded-2xl text-center border border-gray-100 dark:border-gray-800">
                                <div className="text-2xl font-black text-primary-600">$4M+</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Saved</div>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-950 rounded-2xl text-center border border-gray-100 dark:border-gray-800">
                                <div className="text-2xl font-black text-gray-900 dark:text-white">25K+</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Courses</div>
                            </div>
                            <div className="p-6 bg-primary-400 rounded-2xl text-white text-center">
                                <div className="text-2xl font-black">100%</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest opacity-80">Success</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
