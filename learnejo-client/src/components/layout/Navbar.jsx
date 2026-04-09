import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import {
    Navbar as HeroNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    useDisclosure
} from '@heroui/react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo';
import AuthModal from '../auth/AuthModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faCircleInfo,
    faGaugeHigh,
    faUser,
    faRightFromBracket,
    faSignInAlt,
    faFileText,
    faBookOpen
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/', icon: faHouse },
        { name: 'About', path: '/about', icon: faCircleInfo },
        { name: 'Courses', path: '/courses', icon: faBookOpen },
        ...(user ? [{ name: 'Dashboard', path: '/dashboard', icon: faGaugeHigh }] : [])
    ];

    return (
        <>
            <HeroNavbar
                onMenuOpenChange={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                isBordered
                maxWidth="xl"
                height="60px"
                className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 h-[60px]"
            >
                {/* Mobile Menu Toggle */}
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                </NavbarContent>

                {/* Logo Section */}
                <NavbarContent justify="start" className="pr-3">
                    <NavbarBrand className="min-w-fit">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo />
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                {/* Desktop Center Navigation */}
                <NavbarContent className="hidden sm:flex gap-12" justify="center">
                    {navLinks.map((link) => (
                        <NavbarItem key={link.path} isActive={location.pathname === link.path} className="relative h-[60px] flex items-center">
                            <Link
                                to={link.path}
                                className={`text-[14px] uppercase tracking-widest font-black transition-all duration-300 hover:text-primary-600 ${location.pathname === link.path
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {link.icon && <FontAwesomeIcon icon={link.icon} className="w-4 h-4" />}
                                    {link.name}
                                </span>
                            </Link>
                            {(location.pathname === link.path) && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary-600 rounded-t-full shadow-[0_-4px_10px_rgba(24,0,173,0.3)]"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </NavbarItem>
                    ))}
                </NavbarContent>

                {/* Right Actions */}
                <NavbarContent justify="end">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Dropdown placement="bottom-end" backdrop="blur">
                                <DropdownTrigger>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform ring-2 ring-primary-500/20"
                                            color="primary"
                                            name={user.name}
                                            size="sm"
                                            src={user.avatar}
                                        />
                                    </motion.div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-64">
                                    <DropdownItem key="profile_header" className="h-16 gap-2 opacity-100 cursor-default">
                                        <div className="flex flex-col">
                                            <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-primary-600 dark:text-primary-400 truncate">{user.email}</p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem key="settings" as={Link} to="/user/profile" startContent={<FontAwesomeIcon icon={faUser} className="w-4 h-4" />}>
                                        My Profile
                                    </DropdownItem>
                                    <DropdownItem key="dashboard" as={Link} to="/dashboard" startContent={<FontAwesomeIcon icon={faGaugeHigh} className="w-4 h-4" />}>
                                        Dashboard
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger" onClick={logout} className="text-danger" startContent={<FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                onPress={onOpen}
                                variant="shadow"
                                color="primary"
                                className="font-black bg-gradient-to-r from-primary-600 to-primary-800 shadow-primary-500/30 text-white"
                                size="sm"
                                startContent={<FontAwesomeIcon icon={faSignInAlt} className="sm:hidden" />}
                            >
                                <span className="hidden sm:inline italic px-2 tracking-wide">Sign In</span>
                                <span className="sm:hidden">Login</span>
                            </Button>

                            <NavbarItem className="hidden sm:block">
                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant="bordered"
                                    className="font-black border-primary-600/30 hover:bg-primary-50 !transition-all text-primary-600 tracking-wide"
                                    size="sm"
                                >
                                    Join Free
                                </Button>
                            </NavbarItem>
                        </div>
                    )}
                </NavbarContent>

                {/* Mobile Navigation Menu */}
                <NavbarMenu className="pt-6 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <NavbarMenuItem key={`${link.name}-${index}`}>
                                <Link
                                    to={link.path}
                                    className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all ${location.pathname === link.path
                                        ? "bg-primary-50 text-primary-600 font-black shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 active:scale-95"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="text-xl uppercase tracking-widest">{link.name}</span>
                                    {link.icon && <FontAwesomeIcon icon={link.icon} className="w-5 h-5 opacity-50" />}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </div>
                    {!user && (
                        <div className="p-4 mt-auto mb-10 space-y-4">
                            <p className="text-center text-slate-400 font-bold italic mb-4 italic">The #1 Learning Platform</p>
                            <Button
                                className="w-full h-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white font-black text-xl rounded-[20px] shadow-xl shadow-primary-500/20"
                                onPress={() => { onOpen(); setIsMenuOpen(false); }}
                                startContent={<FontAwesomeIcon icon={faSignInAlt} />}
                            >
                                Get Started
                            </Button>
                        </div>
                    )}
                </NavbarMenu>
            </HeroNavbar >
            <AuthModal isOpen={isOpen} onClose={onOpenChange} />
        </>
    );
}
