import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/Dashboard";

import ComponentsPage
    from "../pages/components/ComponentsPage";

import AddComponent
    from "../pages/components/AddComponent";

import EditComponent
    from "../pages/components/EditComponent";

import ConfigurationsPage
    from "../pages/configurations/ConfigurationsPage";

import CreateConfiguration
    from "../pages/configurations/CreateConfiguration";

import ConfigurationDetails
    from "../pages/configurations/ConfigurationDetails";

import PriceHistory
    from "../pages/history/PriceHistory";

import Layout from "../components/layout/Layout";


const ProtectedRoutes = () => {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Layout />;
};


const AppRoutes = () => {

    return (
        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route element={<ProtectedRoutes />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/components"
                    element={<ComponentsPage />}
                />

                <Route
                    path="/components/add"
                    element={<AddComponent />}
                />

                <Route
                    path="/components/edit/:id"
                    element={<EditComponent />}
                />

                <Route
                    path="/configurations"
                    element={<ConfigurationsPage />}
                />

                <Route
                    path="/configurations/create"
                    element={<CreateConfiguration />}
                />

                <Route
                    path="/configurations/:id"
                    element={<ConfigurationDetails />}
                />

                <Route
                    path="/history"
                    element={<PriceHistory />}
                />

            </Route>

            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
};

export default AppRoutes;