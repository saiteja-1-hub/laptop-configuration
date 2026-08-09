import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { user } = useAuth();

    return (
        <header className="navbar">

            <h2>
                Laptop Configuration & Pricing
            </h2>

            <div className="user-info">
                👤 {user?.name}
            </div>

        </header>
    );
};

export default Navbar;