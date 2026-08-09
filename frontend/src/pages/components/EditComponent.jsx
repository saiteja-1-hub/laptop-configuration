import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getComponent,
    updateComponent
} from "../../services/componentService";


const EditComponent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        component_type: "",
        name: "",
        brand: "",
        price: "",
        status: "Active"
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadComponent = async () => {

            try {

                const response =
                    await getComponent(id);

                const component =
                    response.data;

                setForm({
                    component_type:
                        component.component_type,

                    name:
                        component.name,

                    brand:
                        component.brand || "",

                    price:
                        component.price,

                    status:
                        component.status
                });

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        };

        loadComponent();

    }, [id]);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateComponent(id, {
                ...form,
                price: Number(form.price)
            });

            navigate("/components");

        } catch (error) {

            setError(error.message);

        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }


    return (
        <div className="form-page">

            <h1>
                Edit Component
            </h1>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form
                className="form-card"
                onSubmit={handleSubmit}
            >

                <label>
                    Component Type
                </label>

                <input
                    name="component_type"
                    value={form.component_type}
                    onChange={handleChange}
                    required
                />


                <label>
                    Name
                </label>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />


                <label>
                    Brand
                </label>

                <input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                />


                <label>
                    Price
                </label>

                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />


                <label>
                    Status
                </label>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>


                <button
                    type="submit"
                    className="primary-button"
                >
                    Update Component
                </button>

            </form>

        </div>
    );
};

export default EditComponent;