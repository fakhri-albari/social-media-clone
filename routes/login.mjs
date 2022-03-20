import express from "express";
import validation from "../inputValidation.mjs";
import { validationResult } from "express-validator";
import User from "../database/models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.mjs";

const router = express.Router();

router.post("/", validation.login, async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ errors: error.array() });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      res.json({ msg: "Wrong username or password" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      res.json({ msg: "Wrong username or password" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 });

    res.json({ token });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default router;
