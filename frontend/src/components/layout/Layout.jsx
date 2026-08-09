import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useAuth } from "../../context/AuthContext";

const Layout = () => {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (
        <div className="app-layout">

            <Sidebar onLogout={handleLogout} />

            <div className="main-area">

                <Navbar />

                <main className="content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default Layout;