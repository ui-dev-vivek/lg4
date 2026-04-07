import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoutes from './routes/privateRoutes';
import PublicRoutes from './routes/publicRoutes';

export default function App() {
    return (
        <Router>
            <PublicRoutes />
            <PrivateRoutes />
        </Router>
    );
}
