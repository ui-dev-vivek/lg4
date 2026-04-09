import { Routes, Route } from 'react-router-dom';
import Home from '../pages/main/Home';
import About from '../pages/main/About';
import Terms from '../pages/main/Terms';
import Privacy from '../pages/main/Privacy';
import { MainLayout } from '../layouts/MainLayout';
import Courses from '../pages/courses/Courses';

export default function PublicRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/udemy-courses" element={<Courses />} />

                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
            </Route>
        </Routes>
    );
}
