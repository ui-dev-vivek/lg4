import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Divider, Spinner, Image } from '@heroui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faPlay,
    faStar,
    faClock,
    faLayerGroup,
    faLanguage,
    faCheckCircle,
    faCalendarAlt,
    faExternalLinkAlt,
    faShareNodes,
    faBookOpen,
    faEye,
    faChevronRight,
    faGlobe,
    faAward,
    faInfinity,
    faMobileScreen
} from '@fortawesome/free-solid-svg-icons';
import { udemyCourseService } from '../../services/udemyCourseService';
import SEO from '../../components/layout/SEO';

export const CourseView = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await udemyCourseService.getCourse(slug);
                setCourse(data);
            } catch (err) {
                setError(err.message || "Failed to fetch course details");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Spinner size="lg" color="primary" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Unlocking Course Data...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <div className="p-8 bg-danger-50 dark:bg-danger-900/20 rounded-[3rem] text-danger">
                    <FontAwesomeIcon icon={faBookOpen} className="text-6xl" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Oops! Course Not Found</h2>
                    <p className="text-gray-500 font-medium">{error || "This course might have been removed or link is broken."}</p>
                </div>
                <Button
                    onPress={() => navigate('/courses')}
                    variant="flat"
                    color="primary"
                    className="font-black rounded-xl h-12"
                    startContent={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Back to All Courses
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent -mt-12 md:-mt-16">
            <SEO title={course.name} description={course.description} />

            {/* DARK HEADER SECTION - Udemy Inspired, Sharp Enhanced */}
            <div className="bg-gray-950 text-white pt-24 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />

                <div className="container mx-auto px-6 lg:px-12 relative">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-8">
                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary-400">
                                <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/courses')}>Courses</span>
                                <FontAwesomeIcon icon={faChevronRight} className="text-[10px] opacity-50" />
                                <span className="text-white/60">{course.category}</span>
                            </nav>

                            {/* Title & Headline */}
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[1000] leading-[1.1] tracking-tighter">
                                    {course.name}
                                </h1>
                                <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-3xl">
                                    {course.description?.replace(/<[^>]*>/g, '').substring(0, 200)}...
                                </p>
                            </div>

                            {/* Meta Info Bar */}
                            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-400 gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />)}
                                    </div>
                                    <span className="text-sm font-black text-amber-400">{course.rating?.toFixed(1) || '4.8'}</span>
                                    <span className="text-xs font-bold text-gray-500 underline">({course.views?.toLocaleString() || '1,240'} ratings)</span>
                                </div>
                                <div className="text-sm font-bold text-white/80">
                                    Released by <span className="text-primary-400 font-black underline underline-offset-4 decoration-2">{course.store}</span>
                                </div>
                                <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500" />
                                        <span>Update 10/2025</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faGlobe} className="text-primary-500" />
                                        <span>{course.language || 'English'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Card - Large Screen Overlay Style */}
                        <div className="lg:col-span-4 lg:relative">
                            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white dark:bg-gray-900 p-3 lg:absolute lg:top-0 lg:left-0 lg:w-full group">
                                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-gray-100 cursor-pointer">
                                    <Image
                                        src={course.image}
                                        alt={course.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white text-2xl">
                                            <FontAwesomeIcon icon={faPlay} />
                                        </div>
                                        <span className="text-white font-black uppercase tracking-widest text-[10px] mt-4">Preview Course</span>
                                    </div>
                                </div>
                                <CardBody className="px-4 py-8 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-[1000] text-gray-900 dark:text-white tracking-tighter">FREE</span>
                                            {course.price && (
                                                <span className="text-lg text-gray-400 line-through font-bold">₹{Math.round(course.price * 89)}</span>
                                            )}
                                        </div>
                                        <p className="text-danger font-black text-xs uppercase tracking-widest flex items-center gap-2">
                                            <FontAwesomeIcon icon={faClock} className="animate-pulse" />
                                            Limited Time Offer!
                                        </p>
                                    </div>
                                    <Button
                                        className="w-full h-16 bg-primary-600 text-white font-[1000] text-xl rounded-2xl shadow-xl shadow-primary-500/30"
                                        onPress={() => window.open(course.url, '_blank')}
                                    >
                                        Enroll Now — Free
                                    </Button>
                                    <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest">
                                        100% Secure Verified Coupon
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Column (Main Stats & Description) */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* What you'll learn grid */}
                        <div className="p-8 md:p-12 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                            <h2 className="text-3xl font-[1000] text-gray-900 dark:text-white mb-10 tracking-tight">What you'll learn</h2>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    "Understand core concepts and advanced techniques",
                                    "Master industry-standard tools and workflows",
                                    "Build portfolio projects for your career",
                                    "Learn latest best practices and standards",
                                    "Optimize performance and productivity",
                                    "Troubleshoot real-world professional challenges"
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-5 h-5 rounded-full bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 shrink-0 mt-0.5">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-[10px]" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-[1000] text-gray-900 dark:text-white tracking-tight underline decoration-primary-600 decoration-[6px] underline-offset-[12px]">Detailed Description</h2>
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-medium leading-[1.8]"
                                dangerouslySetInnerHTML={{ __html: course.description || '' }}
                            />
                        </div>

                        {/* Bottom Enrollment Action */}
                        <Card className="p-10 border-none bg-primary-50 dark:bg-primary-900/10 rounded-[3rem]">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="space-y-4 text-center md:text-left">
                                    <h3 className="text-3xl font-[1000] text-gray-900 dark:text-white leading-tight">Ready to start?</h3>
                                    <p className="text-gray-500 font-bold">Join 24,000+ students already enrolled in this path.</p>
                                </div>
                                <Button
                                    className="h-16 px-12 bg-primary-600 text-white font-[1000] text-xl rounded-2xl shadow-xl shadow-primary-500/20"
                                    onPress={() => window.open(course.url, '_blank')}
                                >
                                    Enroll for Free
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column (The Features List) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-8 lg:mt-[22rem]">
                            <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">This course includes:</h4>
                            <div className="space-y-6">
                                {[
                                    { icon: faPlay, text: `${course.lectures || 12} High-quality lectures` },
                                    { icon: faMobileScreen, text: "Access on mobile and TV" },
                                    { icon: faInfinity, text: "Full lifetime access" },
                                    { icon: faAward, text: "Certificate of completion" },
                                    { icon: faCheckCircle, text: "Verified 100% OFF Code" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-gray-600 dark:text-gray-400 font-bold">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-primary-600">
                                            <FontAwesomeIcon icon={item.icon} className="text-sm" />
                                        </div>
                                        <span className="text-sm">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Sidebar content if needed */}
                        <div className="p-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-[3rem] text-white space-y-4">
                            <h4 className="font-black text-lg">Platform Guarantee</h4>
                            <p className="text-sm font-medium opacity-90 leading-relaxed italic">
                                "We manually verify every Udemy coupon daily to ensure you never hit a paywall. That's the Learnejo promise."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};