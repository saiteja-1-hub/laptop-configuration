const db = require("./config/db");

const components = [
    ["Processor", "Intel Core i7", "Intel", 45000],
    ["Processor", "AMD Ryzen 7", "AMD", 42000],
    ["RAM", "16GB DDR5", "Corsair", 8000],
    ["RAM", "32GB DDR5", "Kingston", 15000],
    ["Storage", "1TB SSD", "Samsung", 7000],
    ["Graphics Card", "RTX 4060", "NVIDIA", 35000],
    ["Display", "15.6 FHD", "LG", 12000],
    ["Battery", "70Wh Battery", "Dell", 5000],
    ["Keyboard", "RGB Keyboard", "Logitech", 3000],
    ["Operating System", "Windows 11", "Microsoft", 10000]
];

components.forEach(component => {
    db.run(
        `INSERT INTO components
        (component_type, name, brand, price)
        VALUES (?, ?, ?, ?)`,
        component,
        err => {
            if (err) {
                console.log(err.message);
            }
        }
    );
});