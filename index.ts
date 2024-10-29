import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getCachedImage, resizeImage, validateInput } from './image.service';
import { errorHandler } from './errorHandler';

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/images/', validateInput, async (req: Request, res: Response) => {
  const { fileName, width, height } = req.query;

  if (fileName !== undefined) {
    res.set('Content-Type', 'image/png');
    res.send(
      await getCachedImage(req)
    );
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
