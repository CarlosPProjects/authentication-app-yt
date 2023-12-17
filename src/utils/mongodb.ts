import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI)
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

export const connectMongo = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGODB_URI);

  return cached.conn;
};
