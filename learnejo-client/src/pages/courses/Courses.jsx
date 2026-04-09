import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardBody, Button, Chip, Input, Spinner, Image } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faBookOpen,
    faClock,
    faStar,
    faPlayCircle,
    faArrowRight,
    faWandMagicSparkles,
    faEye,
    faCheckCircle,
    faTriangleExclamation,
    faTrendingUp
} from '@fortawesome/free-solid-svg-icons';
import { udemyCourseService } from "../../services/udemyCourseService";
import AIInterviewBanner from '../../components/common/AIInterviewBanner';
import SEO from '../../components/layout/SEO';

export default function Courses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 12,
    });

    const observer = useRef(null);
    const lastCourseElementRef = useCallback((node) => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setFilters(prev => ({ ...prev, skip: prev.skip + prev.limit }));
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore]);

    useEffect(() => {
        fetchCourses(filters.skip === 0);
    }, [filters.skip]);

    const fetchCourses = async (isInitial) => {
        if (isInitial) setLoading(true);
        else setLoadingMore(true);

        try {
            const data = await udemyCourseService.allCourses({
                skip: filters.skip,
                limit: filters.limit
            });

            // Assuming data is an array based on previous sessions
            const courseList = Array.isArray(data) ? data : (data.data || []);

            if (isInitial) {
                setCourses(courseList);
            } else {
                setCourses(prev => [...prev, ...courseList]);
            }

            setHasMore(courseList.length === filters.limit);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load courses');
            if (isInitial) setCourses([]);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    return (
        <div className="space-y-16 pb-20">
            <SEO title="Free Udemy Courses" description="Daily updated 100% OFF coupons for premium Udemy courses." />

            {/* MINIMALIST HERO HEADER */}
            <div className="text-center space-y-6 py-12">
                <div className="flex justify-center">
                    <div className="px-4 py-1.5 bg-primary-50 dark:bg-primary-950/30 rounded-full border border-primary-100 dark:border-primary-900/50">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600">Daily Drop • Oct 2025</span>
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-[1000] text-gray-900 dark:text-white tracking-tighter leading-none">
                    Unlimited <span className="text-primary-600">Knowledge.</span> <br />Zero Cost.
                </h1>
                <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto opacity-80 mt-4">
                    Hand-picked premium courses with 100% OFF coupons, updated every hour.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Main Content Area */}
                <div className="flex-1 space-y-10 w-full">

                    {/* Error State */}
                    {error && (
                        <div className="bg-danger-50 border border-danger-100 rounded-3xl p-6 flex items-center gap-4 text-danger">
                            <FontAwesomeIcon icon={faTriangleExclamation} className="text-2xl" />
                            <div>
                                <h3 className="font-black">Something went wrong</h3>
                                <p className="text-sm opacity-80">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Courses Grid - Extremely Minimal Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <div
                                key={`${course.id}-${index}`}
                                ref={index === courses.length - 1 ? lastCourseElementRef : null}
                                className="group"
                            >
                                <Card
                                    isPressable
                                    onPress={() => navigate(`/courses/${course.slug}`)}
                                    className="border-none bg-white dark:bg-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(24,0,173,0.1)] transition-all duration-500 rounded-[2.5rem] p-3 overflow-hidden"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-gray-800">
                                        {course.image ? (
                                            <img
                                                src={course.image}
                                                alt={course.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                                                <FontAwesomeIcon icon={faBookOpen} className="text-4xl" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <Chip size="sm" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-none font-black text-[9px] uppercase tracking-widest text-primary-600 shadow-sm">
                                                Free
                                            </Chip>
                                        </div>
                                    </div>

                                    <CardBody className="px-4 pt-6 pb-2 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-[1000] text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                                                {course.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                <span>{course.category}</span>
                                                <div className="w-1 h-1 rounded-full bg-gray-200" />
                                                <span>{course.store || 'Udemy'}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-4 pt-1">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                                                <FontAwesomeIcon icon={faPlayCircle} className="text-primary-600" />
                                                {course.lectures || '12'} Lectures
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                                                <FontAwesomeIcon icon={faEye} className="text-primary-600" />
                                                {course.views?.toLocaleString() || '1,240'}
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-baseline gap-2">
                                            <span className="text-2xl font-[1000] text-gray-900 dark:text-white tracking-tighter">FREE</span>
                                            {course.price && (
                                                <span className="text-sm text-gray-300 line-through font-bold">₹{Math.round(course.price * 89)}</span>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-96 w-full animate-pulse bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800" />
                            ))}
                        </div>
                    )}

                    {loadingMore && (
                        <div className="flex justify-center py-12">
                            <Spinner color="primary" size="md" />
                        </div>
                    )}

                    {!hasMore && courses.length > 0 && (
                        <div className="text-center py-16 opacity-30">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">End of Archive</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && courses.length === 0 && (
                        <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
                            <div className="inline-flex p-8 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-6">
                                <FontAwesomeIcon icon={faSearch} className="text-4xl text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No courses found</h3>
                            <p className="text-gray-500 max-w-xs mx-auto font-medium">
                                Try adjusting your filters or search terms.
                            </p>
                        </div>
                    )}
                </div>

                {/* Minimal Sidebar */}
                <aside className="w-full lg:w-80 space-y-12 lg:sticky lg:top-24">
                    <AIInterviewBanner />

                    <div className="space-y-6 px-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Information</h4>
                        <ul className="space-y-6">
                            {[
                                { title: 'Freshness', desc: 'Updated every 15 minutes' },
                                { title: 'Quality', desc: 'Verified enrollment links' },
                                { title: 'Access', desc: 'Lifetime Udemy validity' },
                                { title: 'Support', desc: 'Community curated resources' }
                            ].map((item, i) => (
                                <li key={i} className="space-y-1">
                                    <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter">{item.title}</p>
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600/20 blur-2xl rounded-full" />
                        <div className="flex items-center gap-2 text-primary-400">
                            <FontAwesomeIcon icon={faTrendingUp} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Career Insight</span>
                        </div>
                        <p className="text-sm leading-relaxed font-medium opacity-90 italic">
                            "Continuous learning is the key to staying relevant in today's fast-paced tech landscape."
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
