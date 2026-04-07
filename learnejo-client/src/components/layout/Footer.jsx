import { Link } from 'react-router-dom';
import { Divider } from '@heroui/react';
import Logo from '../Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faUsers,
    faCircleInfo,
    faFileText,
    faBriefcase,
    faBlog,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Quick Links',
            links: [
                { name: 'Home', href: '/', icon: faHouse },
                { name: 'About', href: '/about', icon: faCircleInfo },
                { name: 'Privacy', href: '/privacy', icon: faFileText },
                { name: 'Terms', href: '/terms', icon: faFileText },
            ]
        },
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about', icon: faUsers },
                { name: 'Careers', href: '#', icon: faBriefcase },
                { name: 'Blog', href: '#', icon: faBlog },
                { name: 'Contact', href: '#', icon: faEnvelope },
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', href: '/privacy', icon: faFileText },
                { name: 'Terms of Service', href: '/terms', icon: faFileText },
                { name: 'Cookie Policy', href: '#', icon: faFileText },
            ]
        }
    ];

    return (
        <footer className="relative bg-white dark:bg-gray-950 pt-20 pb-10 overflow-hidden border-t border-gray-100 dark:border-gray-900 mt-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <Logo />
                        </Link>
                        <p className="max-w-xs text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                            Empowering the next generation of developers with structured learning,
                            expert mentorship, and a thriving community.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all cursor-pointer text-gray-500">
                                    <rect width="20" height="20" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {sections.map(section => (
                        <div key={section.title} className="space-y-6">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-900 dark:text-white">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map(link => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors text-sm font-medium flex items-center gap-2"
                                        >
                                            {link.icon && <FontAwesomeIcon icon={link.icon} className="w-3.5 h-3.5 opacity-70" />}
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Divider className="my-8 bg-gray-100 dark:bg-gray-900" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2">
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                        &copy; {currentYear} Learnejo. Built with curiosity by Vivek.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-semibold text-gray-400">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            System Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

