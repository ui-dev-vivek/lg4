import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute, PublicRoute } from './RouteGuards';

// Pages
import Home from '../pages/main/Home';
import About from '../pages/main/About';
import Courses from '../pages/courses/Courses';
import { CourseView } from '../pages/courses/CourseView';
import Terms from '../pages/main/Terms';
import Privacy from '../pages/main/Privacy';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import Profile from '../pages/dashboard/Profile';

export default function AppRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:slug" element={<CourseView />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />

                    {/* Guest only routes (Login / Signup) */}
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<div>Signup Page Placeholder</div>} />
                    </Route>

                    {/* Private routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/user/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}
