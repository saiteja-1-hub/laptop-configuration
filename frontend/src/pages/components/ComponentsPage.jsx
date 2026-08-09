import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    getComponents,
    deleteComponent
} from "../../services/componentService";

import Loader
    from "../../components/common/Loader";

import ErrorMessage
    from "../../components/common/ErrorMessage";


const ComponentsPage = () => {

    const [components, setComponents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    const loadComponents = async () => {

        try {

            const response =
                await getComponents();

            setComponents(response.data || []);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadComponents();

    }, []);


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this component?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteComponent(id);

            setComponents(
                components.filter(
                    (component) =>
                        component.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        }
    };


    const filteredComponents =
        components.filter((component) => {

            const text =
                `${component.name} ${component.brand} ${component.component_type}`
                    .toLowerCase();

            return text.includes(
                search.toLowerCase()
            );
        });


    if (loading) {
        return <Loader />;
    }


    return (
        <div>

            <div className="page-header">

                <div>
                    <h1>
                        Components
                    </h1>

                    <p>
                        Manage laptop components.
                    </p>
                </div>

                <Link
                    to="/components/add"
                    className="primary-button"
                >
                    + Add Component
                </Link>

            </div>


            <ErrorMessage
                message={error}
            />


            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search components..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            <div className="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredComponents.map(
                            (component) => (

                                <tr key={component.id}>

                                    <td>
                                        {component.id}
                                    </td>

                                    <td>
                                        {component.component_type}
                                    </td>

                                    <td>
                                        {component.name}
                                    </td>

                                    <td>
                                        {component.brand}
                                    </td>

                                    <td>
                                        ₹{component.price.toLocaleString("en-IN")}
                                    </td>

                                    <td>
                                        <span className="status">
                                            {component.status}
                                        </span>
                                    </td>

                                    <td>

                                        <Link
                                            to={`/components/edit/${component.id}`}
                                            className="edit-button"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    component.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ComponentsPage;