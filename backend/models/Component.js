const db = require("../config/db");

const Component = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM components ORDER BY id DESC`,
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
                `SELECT * FROM components WHERE id = ?`,
                [id],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                }
            );
        });
    },

    create: (component) => {
        return new Promise((resolve, reject) => {

            const {
                component_type,
                name,
                brand,
                price
            } = component;

            db.run(
                `INSERT INTO components
                (component_type, name, brand, price)
                VALUES (?, ?, ?, ?)`,
                [
                    component_type,
                    name,
                    brand,
                    price
                ],
                function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            id: this.lastID,
                            ...component
                        });
                    }
                }
            );
        });
    },

    update: (id, component) => {
        return new Promise((resolve, reject) => {

            const {
                component_type,
                name,
                brand,
                price,
                status
            } = component;

            db.run(
                `UPDATE components
                 SET component_type = ?,
                     name = ?,
                     brand = ?,
                     price = ?,
                     status = ?,
                     updated_at = CURRENT_TIMESTAMP
                 WHERE id = ?`,
                [
                    component_type,
                    name,
                    brand,
                    price,
                    status,
                    id
                ],
                function (err) {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.changes);
                    }
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {

            db.run(
                `DELETE FROM components WHERE id = ?`,
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

module.exports = Component;