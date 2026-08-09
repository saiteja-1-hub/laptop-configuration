import { NavLink } from "react-router-dom";

const Sidebar = ({ onLogout }) => {

    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                💻 Laptop Config
            </div>

            <nav>

                <NavLink to="/">
                    📊 Dashboard
                </NavLink>

                <NavLink to="/components">
                    🧩 Components
                </NavLink>

                <NavLink to="/configurations">
                    💻 Configurations
                </NavLink>

                <NavLink to="/configurations/create">
                    ➕ Create Configuration
                </NavLink>

                <NavLink to="/history">
                    💰 Price History
                </NavLink>

            </nav>

            <button
                className="logout-button"
                onClick={onLogout}
            >
                🚪 Logout
            </button>

        </aside>
    );
};

export default Sidebar;