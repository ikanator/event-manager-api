import mongoose from "mongoose";

export const connect = async () => {
  const db = mongoose.connection;

  mongoose.connect(
    "mongodb+srv://ikatsadze:Mniiiavc97@cluster0.0ikrr.mongodb.net/event-manager",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

  db.on("error", console.error.bind(console, "connection error:"));
  await db.once("open", () => {
    console.log("Db connected successfully");
  });
};
