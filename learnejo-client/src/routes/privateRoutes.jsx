import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute, PublicRoute } from './RouteGuards';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import Profile from '../pages/dashboard/Profile';

export default function PrivateRoutes() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    {/* Guest only routes requiring AuthProvider */}
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<div>Signup Page Placeholder</div>} />
                    </Route>

                    {/* Private routes requiring AuthProvider and valid user */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/user/profile" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}
