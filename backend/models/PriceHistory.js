const db = require("../config/db");

const PriceHistory = {

    create: (component_id, old_price, new_price, updated_by = null) => {

        return new Promise((resolve, reject) => {

            db.run(
                `INSERT INTO price_history
                (component_id, old_price, new_price)
                VALUES (?, ?, ?)`,
                [
                    component_id,
                    old_price,
                    new_price
                ],
                function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: this.lastID
                        });
                    }
                }
            );

        });
    },

    getAll: () => {

        return new Promise((resolve, reject) => {

            db.all(
                `SELECT 
                    ph.id,
                    ph.component_id,
                    c.name AS component_name,
                    c.component_type,
                    ph.old_price,
                    ph.new_price,
                    ph.updated_at
                 FROM price_history ph
                 JOIN components c
                 ON ph.component_id = c.id
                 ORDER BY ph.updated_at DESC`,
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

    getByComponentId: (componentId) => {

        return new Promise((resolve, reject) => {

            db.all(
                `SELECT *
                 FROM price_history
                 WHERE component_id = ?
                 ORDER BY updated_at DESC`,
                [componentId],
                (err, rows) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                }
            );

        });
    }
};

module.exports = PriceHistory;