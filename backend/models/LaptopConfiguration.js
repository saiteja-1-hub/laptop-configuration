const db = require("../config/db");

const LaptopConfiguration = {

    create: (configuration_name, total_price, created_by) => {

        return new Promise((resolve, reject) => {

            db.run(
                `INSERT INTO configurations
                (configuration_name, total_price, created_by)
                VALUES (?, ?, ?)`,
                [
                    configuration_name,
                    total_price,
                    created_by
                ],
                function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }

                }
            );

        });
    },

    addItem: (
        configuration_id,
        component_id,
        component_price,
        component_name,
        component_type
    ) => {

        return new Promise((resolve, reject) => {

            db.run(
                `INSERT INTO configuration_items
                (
                    configuration_id,
                    component_id,
                    component_price,
                    component_name,
                    component_type
                )
                VALUES (?, ?, ?, ?, ?)`,
                [
                    configuration_id,
                    component_id,
                    component_price,
                    component_name,
                    component_type
                ],
                function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }

                }
            );

        });
    },

    getAll: () => {

        return new Promise((resolve, reject) => {

            db.all(
                `SELECT
                    c.id,
                    c.configuration_name,
                    c.total_price,
                    c.created_by,
                    c.created_at,
                    u.name AS created_by_name
                 FROM configurations c
                 LEFT JOIN users u
                 ON c.created_by = u.id
                 ORDER BY c.id DESC`,
                [],
                (err, rows) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }

                }
            );

        });
    },

    getById: (id) => {

        return new Promise((resolve, reject) => {

            db.get(
                `SELECT *
                 FROM configurations
                 WHERE id = ?`,
                [id],
                (err, configuration) => {

                    if (err) {
                        return reject(err);
                    }

                    if (!configuration) {
                        return resolve(null);
                    }

                    db.all(
                        `SELECT *
                         FROM configuration_items
                         WHERE configuration_id = ?`,
                        [id],
                        (err, items) => {

                            if (err) {
                                reject(err);
                            } else {
                                resolve({
                                    ...configuration,
                                    components: items
                                });
                            }

                        }
                    );

                }
            );

        });
    },

    delete: (id) => {

        return new Promise((resolve, reject) => {

            db.run(
                `DELETE FROM configurations
                 WHERE id = ?`,
                [id],
                function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }

                }
            );

        });
    }
};

module.exports = LaptopConfiguration;