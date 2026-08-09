import { Link } from "react-router-dom";

const Dashboard = () => {

    return (
        <div>

            <div className="page-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Manage laptop components,
                        configurations and pricing.
                    </p>
                </div>

            </div>


            <div className="dashboard-grid">

                <Link
                    to="/components"
                    className="dashboard-card"
                >
                    <span>🧩</span>

                    <h3>
                        Components
                    </h3>

                    <p>
                        Manage processors, RAM,
                        storage and other components.
                    </p>
                </Link>


                <Link
                    to="/configurations"
                    className="dashboard-card"
                >
                    <span>💻</span>

                    <h3>
                        Configurations
                    </h3>

                    <p>
                        View and manage laptop
                        configurations.
                    </p>
                </Link>


                <Link
                    to="/configurations/create"
                    className="dashboard-card"
                >
                    <span>➕</span>

                    <h3>
                        Create Configuration
                    </h3>

                    <p>
                        Build a new laptop and
                        calculate its price.
                    </p>
                </Link>


                <Link
                    to="/history"
                    className="dashboard-card"
                >
                    <span>💰</span>

                    <h3>
                        Price History
                    </h3>

                    <p>
                        Track component price changes.
                    </p>
                </Link>

            </div>

        </div>
    );
};

export default Dashboard;