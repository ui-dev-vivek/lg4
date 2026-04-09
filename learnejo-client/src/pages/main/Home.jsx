import { Button, Input } from '@heroui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBookOpen, faLayerGroup, faRocket } from '@fortawesome/free-solid-svg-icons';
import SEO from '../../components/layout/SEO';
import FeaturesSection from '../../components/home/FeaturesSection';
import SocialProof from '../../components/home/SocialProfe';

export default function Home() {
    return (
        <div className="flex flex-col space-y-20 pb-16">
            <SEO title="Home" />

            {/* HERO SECTION - Simplified & Professional */}
            <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 px-2">
                {/* Left Side: Content */}
                <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-[1000] tracking-tighter leading-[0.95] text-gray-900 dark:text-white">
                            Master Your <br />
                            <span className="text-primary-600 dark:text-primary-500 drop-shadow-sm">Future Success.</span>
                        </h1>
                        <p className="max-w-xl text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Join 50,000+ top-tier students accessing daily updated <span className="text-gray-900 dark:text-white font-bold">Udemy coupons</span>,
                            AI mock interviews, and industry prep kits.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Button
                            as={Link}
                            to="/courses"
                            className="h-16 px-10 bg-primary-600 text-white font-black text-lg rounded-[20px] shadow-2xl shadow-primary-500/30 hover:shadow-primary-600/50 hover:scale-[1.02] active:scale-95 transition-all"
                            endContent={<FontAwesomeIcon icon={faBookOpen} />}
                        >
                            Browse Courses
                        </Button>
                        <Button
                            variant="flat"
                            className="h-16 px-8 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black text-lg rounded-[20px] hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                        >
                            View Categories
                        </Button>
                    </div>
                </div>

                {/* Right Side: Quick Actions */}
                <div className="w-full lg:max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 text-center relative group">
                    <div className="absolute -inset-4 bg-primary-500/5 blur-3xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="relative grid gap-6 p-8 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm rounded-[32px] border border-gray-100/50 dark:border-gray-800/50">
                        <Input
                            placeholder="Try searching for 'React' or 'Python'"
                            size="lg"
                            variant="flat"
                            startContent={<FontAwesomeIcon icon={faSearch} className="text-primary-600" />}
                            className="shadow-sm"
                            classNames={{
                                inputWrapper: "bg-white dark:bg-gray-900 h-20 border-2 border-gray-100 dark:border-gray-800 rounded-2xl px-6 focus-within:border-primary-500 transition-all shadow-inner"
                            }}
                        />

                        <div className="flex items-center justify-center gap-4 text-sm text-slate-500 bg-primary-50/50 dark:bg-primary-950/20 p-5 rounded-2xl border border-primary-100/50 dark:border-primary-900/40">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <p className="font-bold">Join <span className="text-primary-600">50K+</span> learners!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <FeaturesSection />

            {/* SOCIAL PROOF SECTION */}
            <SocialProof />
        </div>
    );
}
