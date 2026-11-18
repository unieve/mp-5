import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "mp5";
export const LINKS_COLLECTION = "links";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }

    return client.db(DB_NAME);
}

type Link = {
    _id: string;
    url: string;
};

export default async function getCollection(
    collectionName: string,
): Promise<Collection<Link>> {
    if (!db) {
        db = await connect();
    }

    return db.collection<Link>(collectionName);
}
