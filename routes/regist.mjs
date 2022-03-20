import express from "express";
import User from "../database/models/User.mjs";
import { validationResult } from "express-validator";
import validation from "../inputValidation.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.mjs";

const router = express.Router();

router.post("/", validation.regist, async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.json({ errors: error.array() });
    }

    const { name, email, username, password } = req.body;

    const user = new User({
      name,
      email,
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 25000,
    });

    res.json({ token });
  } catch (error) {
    switch (error.code) {
      case 11000:
        res.json({ msg: "Error duplicated key", key: error.keyValue });
        break;
      default:
        res.status(500).json({ msg: "Server error" });
    }
  }
});

export default router;
