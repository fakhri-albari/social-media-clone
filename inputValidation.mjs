import { body } from "express-validator";

export default {
  regist: [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Email format is wrong").isEmail(),
    body("username", "Username is required").not().isEmpty(),
    body("password", "Password is required").not().isEmpty(),
  ],
  login: [
    body("username", "Username is required").not().isEmpty(),
    body("password", "Password is required").not().isEmpty(),
  ],
};
