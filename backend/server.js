require("dotenv").config();

const app = require("./app");

// This initializes the database
require("./config/db");

const PORT =
    process.env.PORT || 5000;

app.listen(PORT,  "0.0.0.0" ,() => {

    console.log(
        `Server is running on port ${PORT}`
    );

});