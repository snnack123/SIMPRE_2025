import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URL;

let mongoClient = null;
let database = null;

if (!uri) {
  throw new Error('Please add your Mongo URL to .env');
}

export async function connectToDatabase() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }

    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClient) {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        global._mongoClient = mongoClient;
      } else {
        mongoClient = global._mongoClient;
      }
    } else {
      mongoClient = new MongoClient(uri);
      await mongoClient.connect();
    }

    database = mongoClient.db(process.env.NEXT_ATLAS_DATABASE);
    return { mongoClient, database };
  } catch (e) {
    console.error('Failed to connect to database:', e);
    throw e;
  }
}
