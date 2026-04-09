import { useState, useEffect } from "react";
import { Card, CardBody, Avatar, Divider } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
    {
        id: 1,
        name: "Vivek Chaudhary",
        role: "Frontend Developer",
        content: "Learnejo literally saved me thousands of dollars. I got a premium Full Stack React course for 100% off and landed my first internship!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=vivek"
    },
    {
        id: 2,
        name: "Ananya Iyer",
        role: "UX Designer",
        content: "I check Learnejo every morning. The quality of courses curated here is top-notch. It's premium content that actually matters.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=ananya"
    },
    {
        id: 3,
        name: "Rahul Mehta",
        role: "Data Scientist",
        content: "The Python and Machine Learning courses were game-changers for my career transition. 100% verified links.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=rahul"
    },
    {
        id: 4,
        name: "Sneha Reddy",
        role: "Computer Student",
        content: "As a student on a budget, Learnejo is a blessing. I've built up a whole library of premium Udemy courses for free.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sneha"
    },
];

function TestimonialCard({ testimonial }) {
    return (
        <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-900 rounded-3xl group">
            <CardBody className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-lg" />
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-[10px]" />
                        ))}
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic text-[15px] leading-relaxed font-medium">
                    "{testimonial.content}"
                </p>

                <div className="pt-2 flex items-center gap-4">
                    <Avatar
                        src={testimonial.avatar}
                        name={testimonial.name}
                        size="md"
                        className="rounded-2xl group-hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                        <h4 className="font-black text-gray-900 dark:text-white text-[15px]">
                            {testimonial.name}
                        </h4>
                        <p className="text-[11px] text-primary-600 font-black uppercase tracking-widest mt-0.5">
                            {testimonial.role}
                        </p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default function SocialProof() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                        Trusted by <span className="text-primary-600">50,000+ Learners</span>
                    </h2>
                    <p className="text-gray-500 font-medium max-w-xl mx-auto">
                        Asia's fastest-growing student community for free premium resources.
                    </p>
                </div>

                <div className="hidden lg:grid grid-cols-4 gap-6">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>

                <div className="lg:hidden max-w-sm mx-auto">
                    <TestimonialCard testimonial={testimonials[activeIndex]} />
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-8 bg-primary-600" : "w-1.5 bg-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Simplified CTA Section */}
                <div className="mt-20">
                    <div className="bg-primary-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl shadow-primary-500/20">
                        <h3 className="text-3xl md:text-4xl font-black mb-4">Ready to boost your career?</h3>
                        <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto font-medium">
                            Join thousands of students and get access to premium tools for free.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="h-14 px-8 bg-white text-primary-600 font-black rounded-xl shadow-lg hover:bg-gray-50 transition-all">
                                Join Now — It's Free
                            </button>
                            <button className="h-14 px-8 bg-primary-700 text-white font-black rounded-xl hover:bg-primary-800 transition-all">
                                Browse All Coupons
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
