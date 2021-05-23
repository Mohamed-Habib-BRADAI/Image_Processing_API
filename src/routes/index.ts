import express from 'express';
import sharp from 'sharp';
import logger from "../utilities/logger";
import {promises as fs} from 'fs';

const routes = express.Router();
routes.get('/', logger, async (req, res) => {
    const fullPath = '/assets/images/full/';
    const thumbPath = '/assets/images/thumb/';
    let image_name = req.query.filename as string;
    let stringWidth = req.query.width as string;
    let stringHeight = req.query.height as string;
    let height, width;
    if (stringWidth) {
        height = parseInt(stringHeight, 10)
    }
    if (stringHeight) {
        width = parseInt(stringWidth, 10)
    }
    let nameArray = [image_name, stringWidth, stringHeight]
    let thumb_file_name = nameArray.join('-');
    let fullFiles = await (fs.readdir('.' + fullPath) as Promise<string[]>)
    let fullFile = fullFiles.find(file => file.split('.')[0] == image_name)
    if (!fullFile) {
        return
    }
    let extension = fullFile.split('.')[1];
    let thumbFile = thumb_file_name + '.' + extension;
    let thumbFiles = await (fs.readdir('.' + thumbPath) as Promise<string[]>)
    let index = thumbFiles.indexOf(thumbFile)
    if (index == -1) {
        const buffer = await sharp('.' + fullPath + fullFile).resize({width: width, height: height, background: 'red'}).png().toBuffer()
        const file = await fs.open('.' + thumbPath + thumbFile, 'a+');
        await file.write(buffer);
        file.close();
    }
    res.sendFile(thumbPath + thumbFile, {root: './'})
});


export default routes
