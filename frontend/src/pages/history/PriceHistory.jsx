import {
    useEffect,
    useState
} from "react";

import {
    getPriceHistory
} from "../../services/historyService";


const PriceHistory = () => {

    const [history, setHistory] =
        useState([]);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadHistory = async () => {

            try {

                const response =
                    await getPriceHistory();

                setHistory(
                    response.data || []
                );

            } catch (error) {

                setError(error.message);

            }
        };

        loadHistory();

    }, []);


    return (
        <div>

            <div className="page-header">

                <div>

                    <h1>
                        Price History
                    </h1>

                    <p>
                        Track component price changes.
                    </p>

                </div>

            </div>


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            <div className="table-container">

                <table>

                    <thead>

                        <tr>
                            <th>Component ID</th>
                            <th>Old Price</th>
                            <th>New Price</th>
                            <th>Updated</th>
                        </tr>

                    </thead>

                    <tbody>

                        {history.map(
                            (item) => (

                                <tr key={item.id}>

                                    <td>
                                        {item.component_id}
                                    </td>

                                    <td>
                                        ₹{Number(
                                            item.old_price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>

                                    <td>
                                        ₹{Number(
                                            item.new_price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>

                                    <td>
                                        {item.updated_at}
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

export default PriceHistory;