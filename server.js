import { app } from "./app.js";
import { connectDB } from "./data/database.js";


connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    `Server listening on port: ${process.env.PORT}, in ${process.env.NODE_ENV} MODE.`
    );
});