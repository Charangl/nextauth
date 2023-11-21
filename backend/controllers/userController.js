import dotevn from "dotenv";
dotevn.config();

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