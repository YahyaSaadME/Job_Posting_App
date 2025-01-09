// filepath: /D:/Intern ships/Freelance/Job_Posting_App/src/utils/dbConnect.ts
import mongoose from "mongoose";

// Declare the cache to hold the Mongoose connection and promise for re-use
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

// Get MongoDB URI from environment variables
const user = encodeURIComponent(process.env.MONGODB_USER || '');
const password = encodeURIComponent(process.env.MONGODB_PASS || '');

const url = `mongodb+srv://${user}:${password}@textapps.er1hajy.mongodb.net/?retryWrites=true&w=majority&appName=TextApps`;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

async function dbConnect() {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn; // If already connected, return the connection
  }

  if (!global.mongooseCache.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    global.mongooseCache.promise = mongoose.connect(url, opts).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default dbConnect;