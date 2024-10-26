import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { resizeImage } from "./image.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/images/",  async (req: Request, res: Response) => {
	const {fileName = "", width, height} = req.query;

	try {
		res.set('Content-Type', 'image/png');
		res.send(await resizeImage(fileName.toString(), Number(width), Number(height)));
	} catch (error) {
		res.set('Content-Type', 'text/javascript');
		res.send("Not found image!");
	}
})

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});