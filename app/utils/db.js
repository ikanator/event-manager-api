import mongoose from "mongoose";

export const connect = async () => {
  const db = mongoose.connection;

  mongoose.connect("mongodb://localhost:27017/garaj_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on("error", console.error.bind(console, "connection error:"));
  await db.once("open", () => {
    console.log("Db connected successfully");
  });
};
