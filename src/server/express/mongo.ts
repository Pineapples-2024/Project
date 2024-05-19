import { MongoClient, ServerApiVersion } from "mongodb"

const URI = `mongodb+srv://pineapple:${process.env["MONGO_PW"]}@pineapple.i1pwt0n.mongodb.net/?retryWrites=true&w=majority&appName=Pineapple`;
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true
    }
});