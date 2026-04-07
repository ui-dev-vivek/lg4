import { Button, Input, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLayerGroup, faBookOpen, faCode, faPalette, faRocket } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    return (
        <div className="flex flex-col space-y-24 pb-20">
            {/* HERO SECTION - Matching the User's Image */}
            <section className="flex flex-col lg:flex-row items-center justify-between gap-16 mt-12 px-2">
                {/* Left Side: Content */}
                <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-gray-900 dark:text-white">
                        Get Premium Udemy <br />
                        <span className="text-primary-600 dark:text-primary-500">Courses for FREE</span> Today!
                    </h1>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-500 dark:text-slate-400">
                            Unlock Your Learning Potential with 100% Free Coupons
                        </h2>
                        <p className="max-w-xl text-lg text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
                            Discover thousands of premium Udemy courses completely free! From
                            programming and design to business and marketing - learn anything
                            without spending a dime. Join over 50,000+ students who've saved
                            millions on their education.
                        </p>
                    </div>
                </div>

                {/* Right Side: Search and Categories */}
                <div className="w-full lg:max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                    <div className="grid gap-6">
                        {/* Search Input matching image */}
                        <Input
                            placeholder="Try searching for 'React' or 'Python'"
                            size="lg"
                            variant="flat"
                            startContent={<FontAwesomeIcon icon={faSearch} className="text-gray-400" />}
                            endContent={
                                <div className="hidden sm:flex items-center text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 rounded-md text-[10px] font-mono whitespace-nowrap">
                                    Press ⌘ + K
                                </div>
                            }
                            className="shadow-sm"
                            classNames={{
                                inputWrapper: "bg-gray-50 dark:bg-gray-900 h-16 border border-gray-100 dark:border-gray-800"
                            }}
                        />

                        {/* Action Buttons matching image */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                className="flex-1 h-16 font-black text-lg bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-500/20 active:scale-95"
                                startContent={<FontAwesomeIcon icon={faBookOpen} />}
                            >
                                Browse Courses
                            </Button>
                            <Button
                                variant="bordered"
                                className="flex-1 h-16 font-black text-lg border-primary-600 text-primary-600 rounded-2xl active:scale-95"
                                startContent={<FontAwesomeIcon icon={faLayerGroup} />}
                            >
                                Categories
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500 bg-primary-50 dark:bg-primary-950/20 p-4 rounded-xl border border-primary-100 dark:border-primary-900/40">
                        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600">
                            <FontAwesomeIcon icon={faRocket} />
                        </div>
                        <p>Join <span className="font-bold text-primary-600 italic">50,000+</span> learners saving daily!</p>
                    </div>
                </div>
            </section>

            {/* FEATURE SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Programming', icon: faCode, desc: 'Web Dev, Python, JS', color: 'primary' },
                    { title: 'Design', icon: faPalette, iconColor: 'pink', desc: 'UI/UX, Photoshop, Canva', color: 'pink' },
                    { title: 'Business', icon: faRocket, desc: 'Marketing, Finance, SEO', color: 'amber' },
                ].map((item, i) => (
                    <Card key={i} className="group hover:-translate-y-2 transition-all duration-500 border-none shadow-xl bg-white dark:bg-gray-900 border border-gray-50 dark:border-gray-800">
                        <CardBody className="p-8 space-y-4">
                            <div className={`w-14 h-14 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900 flex items-center justify-center text-${item.color}-600 group-hover:rotate-12 transition-transform`}>
                                <FontAwesomeIcon icon={item.icon} className="text-2xl" />
                            </div>
                            <h3 className="text-2xl font-black">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {item.desc}. Find thousands of coupons updated daily.
                            </p>
                        </CardBody>
                    </Card>
                ))}
            </section>
        </div>
    );
}
