const sqlite3 = require('sqlite3').verbose();

const path  = require("path")

const db = new sqlite3.Database(
    path.join(__dirname,"database.db"), 
    (err)=>{
    if(err){
        console.log("error in connecting to database", err.message);
    }
    else{
        console.log("connected to database");
        db.run("PRAGMA foreign_keys = ON;");
    }

})


db.serialize(()=>{
    db.run(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'sales',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,(err)=>{
        if(err){
            console.log(err.message);
        }
        else{
           console.log("Users table created successfully.");
        }
    }
)


    db.run(
    `CREATE TABLE IF NOT EXISTS components (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    component_type TEXT NOT NULL,
    name TEXT NOT NULL,
    brand TEXT,
    price REAL NOT NULL,
    status TEXT DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,(err)=>{
        if(err){
            console.log(err.message)
        }
        else{
           console.log("Components table created successfully.");
        }
    }
    )

    db.run(
    `CREATE TABLE IF NOT EXISTS configurations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    configuration_name TEXT NOT NULL,
    total_price REAL DEFAULT 0,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(created_by) REFERENCES users(id)
   );`,(err)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Configurations table created successfully.");
        }
    }
    )


    db.run(
    `CREATE TABLE IF NOT EXISTS configuration_items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    configuration_id INTEGER NOT NULL,
    component_id INTEGER NOT NULL,
    component_price REAL NOT NULL,
    component_name TEXT,
    component_type TEXT,
    FOREIGN KEY(configuration_id)
    REFERENCES configurations(id)
    ON DELETE CASCADE,
    FOREIGN KEY(component_id)
    REFERENCES components(id)
    );`,(err)=>{
        if(err){
            console.log(err.message)
        }
        else{
           console.log("Configuration_items table created successfully.");
        }
    }
)

    db.run(
    `
    CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    component_id INTEGER NOT NULL,
    old_price REAL,
    new_price REAL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(component_id)
    REFERENCES components(id)
    );`,(err)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log("Price_history table created successfully.");
        }
    }
    )
     
})


module.exports = db;