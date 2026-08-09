import { useState } from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    createComponent
} from "../../services/componentService";


const AddComponent = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        component_type: "",
        name: "",
        brand: "",
        price: "",
        status: "Active"
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createComponent({
                ...form,
                price: Number(form.price)
            });

            navigate("/components");

        } catch (error) {

            setError(error.message);

        }
    };


    return (
        <div className="form-page">

            <h1>
                Add Component
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

                <select
                    name="component_type"
                    value={form.component_type}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select type
                    </option>

                    <option value="Processor">
                        Processor
                    </option>

                    <option value="RAM">
                        RAM
                    </option>

                    <option value="Storage">
                        Storage
                    </option>

                    <option value="Graphics Card">
                        Graphics Card
                    </option>

                    <option value="Display">
                        Display
                    </option>

                    <option value="Battery">
                        Battery
                    </option>

                    <option value="Keyboard">
                        Keyboard
                    </option>

                    <option value="Operating System">
                        Operating System
                    </option>

                </select>


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
                    min="0"
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


                <div className="form-actions">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/components")
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Add Component
                    </button>

                </div>

            </form>

        </div>
    );
};

export default AddComponent;