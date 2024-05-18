import dotenv from "dotenv";

dotenv.config();

import { createServer } from "http";
import app from "./restApi";

const server = createServer();

server.on("request", app);

server.listen(3000, () => {
    console.log(`API started on port :3000`);
});
