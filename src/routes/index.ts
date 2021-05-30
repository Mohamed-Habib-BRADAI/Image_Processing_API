import express, { Request, Response } from 'express';
import logger from '../utilities/logger';
import ImageProcess from '../utilities/imageProcess';

const routes = express.Router();
routes.get(
  '/',
  logger,
  async (req: Request, res: Response): Promise<void> => {
    const image_name = req.query.filename as string;
    const stringWidth = req.query.width as string;
    const stringHeight = req.query.height as string;
    try {
      const [thumbPath, thumbFile] = await ImageProcess.processFile(
        image_name,
        stringWidth,
        stringHeight
      );
      res.sendFile(thumbPath + thumbFile, { root: './' });
    } catch (e) {
      res.json(e.message);
    }
  }
);

export default routes;
