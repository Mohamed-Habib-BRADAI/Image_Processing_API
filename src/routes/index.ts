import express from 'express';
import sharp from 'sharp';
import logger from '../utilities/logger';
import {promises as fs} from 'fs';
import ImageProcess from '../utilities/imageProcess'

const routes = express.Router();
routes.get('/', logger, async (req, res) => {
    try {
    let image_name = req.query.filename as string;
    let stringWidth = req.query.width as string;
    let stringHeight = req.query.height as string;
    if (!image_name) {
        throw new Error("No file name");
    }
    let thumbPath, thumbFile;

        [thumbPath, thumbFile] = await ImageProcess.processFile(image_name, stringWidth, stringHeight);
        res.sendFile(thumbPath + thumbFile, {root: './'});
    } catch (e) {
        console.error(e);
    }
});

export default routes;
