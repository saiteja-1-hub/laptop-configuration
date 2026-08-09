import { useEffect, useState } from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getComponents
} from "../../services/componentService";

import {
    createConfiguration
} from "../../services/configurationService";


const componentTypes = [
    "Processor",
    "RAM",
    "Storage",
    "Graphics Card",
    "Display",
    "Battery",
    "Keyboard",
    "Operating System"
];


const CreateConfiguration = () => {

    const navigate = useNavigate();

    const [components, setComponents] =
        useState([]);

    const [configurationName, setConfigurationName] =
        useState("");


    const [selected, setSelected] =
        useState({});


    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadComponents = async () => {

            try {

                const response =
                    await getComponents();

                setComponents(
                    response.data || []
                );

            } catch (error) {

                setError(error.message);

            }
        };

        loadComponents();

    }, []);


    const handleSelect = (
        componentType,
        componentId
    ) => {

        const component =
            components.find(
                (item) =>
                    item.id === Number(componentId)
            );

        setSelected({
            ...selected,
            [componentType]: component
        });
    };


    const selectedComponents =
        Object.values(selected)
            .filter(Boolean);


    const totalPrice =
        selectedComponents.reduce(
            (total, component) =>
                total + Number(component.price),
            0
        );


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!configurationName.trim()) {

            setError(
                "Configuration name is required"
            );

            return;
        }


        if (selectedComponents.length === 0) {

            setError(
                "Select at least one component"
            );

            return;
        }


        try {

            await createConfiguration({

                configuration_name:
                    configurationName,

                components:
                    selectedComponents.map(
                        (component) => ({
                            component_id:
                                component.id
                        })
                    )
            });


            navigate("/configurations");

        } catch (error) {

            setError(error.message);

        }
    };


    return (
        <div>

            <div className="page-header">

                <div>

                    <h1>
                        Create Configuration
                    </h1>

                    <p>
                        Build a laptop configuration.
                    </p>

                </div>

            </div>


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            <form
                className="configuration-builder"
                onSubmit={handleSubmit}
            >

                <div className="configuration-form">

                    <label>
                        Configuration Name
                    </label>

                    <input
                        value={configurationName}
                        onChange={(e) =>
                            setConfigurationName(
                                e.target.value
                            )
                        }
                        placeholder="Gaming Laptop"
                        required
                    />


                    {componentTypes.map(
                        (type) => {

                            const typeComponents =
                                components.filter(
                                    (component) =>
                                        component.component_type === type &&
                                        component.status === "Active"
                                );


                            return (
                                <div
                                    className="component-selector"
                                    key={type}
                                >

                                    <label>
                                        {type}
                                    </label>

                                    <select
                                        value={
                                            selected[type]?.id || ""
                                        }
                                        onChange={(e) =>
                                            handleSelect(
                                                type,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select {type}
                                        </option>

                                        {typeComponents.map(
                                            (component) => (

                                                <option
                                                    key={component.id}
                                                    value={component.id}
                                                >
                                                    {component.name}
                                                    {" - "}
                                                    ₹{Number(
                                                        component.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>
                            );
                        }
                    )}

                </div>


                <div className="price-card">

                    <h2>
                        Price Breakdown
                    </h2>


                    {selectedComponents.map(
                        (component) => (

                            <div
                                className="price-row"
                                key={component.id}
                            >

                                <span>
                                    {component.name}
                                </span>

                                <strong>
                                    ₹{Number(
                                        component.price
                                    ).toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                        )
                    )}


                    <hr />


                    <div className="total-row">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{totalPrice.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>


                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Save Configuration
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CreateConfiguration;