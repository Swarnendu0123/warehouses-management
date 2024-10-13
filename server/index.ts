import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const { BACKEND_URL, FRONTEND_URL } = require("./config");
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/warehouse-management";

const itemModel = require("./database/item.model");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}
connectToMongoDB();

// get all the notes of a user
app.get("/items", async (req: Request, res: Response) => {
  const { user } = req.body;

  try {
    const items = await itemModel.find({ createdBy: user });
    res.json(items);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// read note by id
app.get("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const item = await itemModel.findOne({ id });
    res.json(item);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// create a new note
app.post("/items", async (req: Request, res: Response) => {
  const { text, parent, createdBy } = req.body;

  try {
    const item = new itemModel({
      id: uuidv4(),
      text,
      parent,
      createdBy,
    });

    await item.save();
    res.json(item);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// update a note
app.put("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, parent_godown } = req.body;

  try {
    const item = await itemModel.findOne({
      id,
    });

    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    item.text = text;
    item.parent_godown = parent_godown;

    await item.save();
    res.json(item);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

// delete a note
app.delete("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await itemModel.deleteOne({ id });
    res.json({ message: "Item deleted" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
