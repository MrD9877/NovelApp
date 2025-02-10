import mongoose from "mongoose";
export const runtime = "nodejs";

type Connection = { isConnected: number };
const connection: Connection = { isConnected: 0 };

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect("mongodb+srv://dhuruvbansl99:Shubham123@cluster0.jos6q.mongodb.net/NovelStore");
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
    process.exit();
    // return new Response("Internal Server Error", { status: 500 });
  }
}

export default dbConnect;
