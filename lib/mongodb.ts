import { MongoClient, ServerApiVersion } from 'mongodb';

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb() {
  const uri = process.env.MONGODB_URI as string | undefined;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  const c = await (global._mongoClientPromise!);
  const dbName = process.env.MONGODB_DB || 'e_cell';
  return c.db(dbName);
}