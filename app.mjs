import express from "express";
import config from "./config.mjs";
import { auth } from "./middleware/auth.mjs";
import { error as errorMiddleware } from "./middleware/error.mjs";
import loginRoute from "./routes/login.mjs";
import registRoute from "./routes/regist.mjs";
import profileRoute from "./routes/private/profile.mjs";
import connect from "./database/connection.mjs";

const app = express();

const PORT = process.env.PORT || config.PORT;

connect();

app.listen(PORT, () => {
  console.log(`App start using port ${PORT}`);
});

app.all("/api/*", auth);

app.use(express.json());

// public api
app.use("/login", loginRoute);
app.use("/regist", registRoute);

// private api
app.use("/api/profile", profileRoute);

// error 404 handler
app.use(errorMiddleware);
