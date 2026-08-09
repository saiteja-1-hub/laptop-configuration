import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getConfiguration
} from "../../services/configurationService";


const ConfigurationDetails = () => {

    const { id } = useParams();

    const [configuration, setConfiguration] =
        useState(null);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadConfiguration = async () => {

            try {

                const response =
                    await getConfiguration(id);

                setConfiguration(
                    response.data
                );

            } catch (error) {

                setError(error.message);

            }
        };

        loadConfiguration();

    }, [id]);


    if (error) {
        return (
            <div className="error-message">
                {error}
            </div>
        );
    }


    if (!configuration) {
        return <p>Loading...</p>;
    }


    return (
        <div>

            <h1>
                {configuration.configuration_name}
            </h1>

            <p>
                Created: {configuration.created_at}
            </p>


            <div className="price-card">

                <h2>
                    Component Breakdown
                </h2>


                {configuration.components?.map(
                    (component) => (

                        <div
                            className="price-row"
                            key={component.id}
                        >

                            <span>
                                {component.component_name}
                            </span>

                            <strong>
                                ₹{Number(
                                    component.component_price
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
                        ₹{Number(
                            configuration.total_price
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>

            </div>

        </div>
    );
};

export default ConfigurationDetails;