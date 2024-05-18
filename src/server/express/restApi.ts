import packageJSON from "../../../package.json";
import express, { Application } from "express";
import cors from "cors";

import { ROOT_URL } from "@/constants";
import { Request, Response } from "express";

const app: Application = express();

const accounts: Record<string, string> = {
    oscar: "123",
    kamal: "k$7p3",
};

const attempts: Record<string, number> = {};

app.use(express.json({ limit: "20mb" }));
app.use(
    cors({
        origin: "http://localhost:5100",
        allowedHeaders: "Accept,Content-Type,Origin,Host",
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));

app.post(`${ROOT_URL}login`, (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;

    if (!name) {
        res.status(400).send("Please enter a valid username");
        return;
    }

    if (!pass) {
        res.status(400).send("Please provide a password");
        return;
    }

    const attemptsTaken = attempts[name];
    const correctPass = accounts[name]!;

    if (attemptsTaken == 6) {
        res.status(401).send("Exceeded number of attempts. Please try again later.");
        return;
    }

    res.header("X-Powered-By", "Pineapples");

    if (pass == correctPass) {
        res.status(200)
            .cookie("name", name, {
                path: "/",
                httpOnly: false,
                maxAge: 1000 * 10,
                secure: true,
                sameSite: "none"
            })
            .send("Correct username & correct password. Welcome back for 10 seconds.");
        attempts[name] = 0;
    } else {
        if (attemptsTaken) {
            res.status(401).send("Incorrect password... please try again. (Attempts: " + attemptsTaken + ")");
        } else {
            res.status(401).send("Incorrect password... please try again.");
        }

        if (!attemptsTaken) attempts[name] = 1;

        attempts[name]++;
    }
});

app.get(`${ROOT_URL}version`, (req: Request, res: Response) => {
    const respObj: RespExampleType = {
        id: 1,
        version: packageJSON.version,
        envVal: process.env.ENV_VALUE as string, // sample server-side env value
    };
    res.send(respObj);
});

app.use(express.static("./.local/vite/dist"));

export default app;
