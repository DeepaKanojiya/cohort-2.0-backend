const app = require("./src/app")
const connectToDb = require("./src/config/database")
require("dotenv").config()



//conecting database
connectToDb();



app.listen(3000,()=>{
    console.log("server is runnig on port on 3000")
})