import { useEffect, useState } from "react";

import {
    Link
} from "react-router-dom";

import {
    getConfigurations
} from "../../services/configurationService";


const ConfigurationsPage = () => {

    const [configurations, setConfigurations] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadConfigurations = async () => {

            try {

                const response =
                    await getConfigurations();

                setConfigurations(
                    response.data || []
                );

            } catch (error) {

                setError(error.message);

            }
        };

        loadConfigurations();

    }, []);


    const filtered =
        configurations.filter(
            (configuration) =>
                configuration.configuration_name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


    return (
        <div>

            <div className="page-header">

                <div>

                    <h1>
                        Configurations
                    </h1>

                    <p>
                        Saved laptop configurations.
                    </p>

                </div>

                <Link
                    to="/configurations/create"
                    className="primary-button"
                >
                    + Create Configuration
                </Link>

            </div>


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            <div className="toolbar">

                <input
                    placeholder="Search configurations..."
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

                            <th>Name</th>

                            <th>Total Price</th>

                            <th>Created</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map(
                            (configuration) => (

                                <tr
                                    key={
                                        configuration.id
                                    }
                                >

                                    <td>
                                        {configuration.id}
                                    </td>

                                    <td>
                                        {
                                            configuration.configuration_name
                                        }
                                    </td>

                                    <td>
                                        ₹{Number(
                                            configuration.total_price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>

                                    <td>
                                        {
                                            configuration.created_at
                                        }
                                    </td>

                                    <td>

                                        <Link
                                            to={`/configurations/${configuration.id}`}
                                            className="edit-button"
                                        >
                                            View
                                        </Link>

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

export default ConfigurationsPage;