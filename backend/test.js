const db = require("./config/db");

db.all("SELECT * FROM components", [], (err, rows) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Components:");
        console.table(rows);
    }
});

db.all("SELECT * FROM configurations", [], (err, rows) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Configurations:");
        console.table(rows);
    }
});

db.all("SELECT * FROM configuration_items", [], (err, rows) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Configuration Items:");
        console.table(rows);
    }
});



db.run(
    "DELETE FROM components WHERE id = ?",
    [1],
    function (err) {
        if (err) {
            console.log("ERROR:", err.message);
        } else {
            console.log("Deleted rows:", this.changes);
        }
    }
);

db.all("PRAGMA foreign_key_list(components);", [], (err, rows) => {
    console.log("Components foreign keys:");
    console.table(rows);
});

db.all("PRAGMA foreign_key_list(configuration_items);", [], (err, rows) => {
    console.log("Configuration Items foreign keys:");
    console.table(rows);
});

db.all("SELECT * FROM price_history", [], (err, rows) => {
    console.log("Price History");
    console.table(rows);
});