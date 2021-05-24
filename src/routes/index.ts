import express from 'express';
import sharp from 'sharp';
import logger from '../utilities/logger';
import { promises as fs } from 'fs';
import ImageProcess from '../utilities/imageProcess';

const routes = express.Router();
routes.get('/', logger, async (req, res): Promise<void> => {
  let image_name = req.query.filename as string;
  let stringWidth = req.query.width as string;
  let stringHeight = req.query.height as string;
  let thumbPath, thumbFile;
  try {
    [thumbPath, thumbFile] = await ImageProcess.processFile(
      image_name,
      stringWidth,
      stringHeight
    );
    res.sendFile(thumbPath + thumbFile, { root: './' });
  } catch (e) {
    res.json(e.message);
  }
});

export default routes;
