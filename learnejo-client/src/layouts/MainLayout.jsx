import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
