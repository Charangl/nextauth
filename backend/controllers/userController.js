import dotevn from "dotenv";
dotevn.config();
import bcrypt from "bcryptjs";

import db from "../models/index.js";

const User = db.User;

export const getOneUser = async (req, res) => {
  console.log("getOneUser from controller page");
  try {
    const { id } = req.params;
    console.log(id, "id");
    const user = await User.findOne({ where: { idUser: id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

/*****************************REGISTER*****************************/

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).send({ message: "L'email existe déjà" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(newUser, "newUser");
    return res.status(200).send({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

/*******************************LOGIN*******************************/

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const { name } = user;

    res.status(200).json({ message: "Login successful", name });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};
