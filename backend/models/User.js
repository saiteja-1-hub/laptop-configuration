const db = require("../config/db");

const User = {

    findByEmail: (email) => {

        return new Promise((resolve, reject) => {

            db.get(
                `SELECT *
                 FROM users
                 WHERE email = ?`,
                [email],
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

    findById: (id) => {

        return new Promise((resolve, reject) => {

            db.get(
                `SELECT id, name, email, role
                 FROM users
                 WHERE id = ?`,
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

    create: (name, email, password, role = "sales") => {

        return new Promise((resolve, reject) => {

            db.run(
                `INSERT INTO users
                (name, email, password, role)
                VALUES (?, ?, ?, ?)`,
                [
                    name,
                    email,
                    password,
                    role
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
    }
};

module.exports = User;