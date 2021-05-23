import express from 'express';
import sharp from 'sharp';
import {promises as fs} from 'fs';

async function processFile(fileName: string, stringWidth: string, stringHeight: string): Promise<[string, string]> {
    const fullPath = '/assets/images/full/';
    const thumbPath = '/assets/images/thumb/';
    let height, width;
    if (stringWidth) {
        height = parseInt(stringHeight, 10);
    }
    if (stringHeight) {
        width = parseInt(stringWidth, 10);
    }
    let nameArray = [fileName, stringWidth, stringHeight];
    let thumb_file_name = nameArray.join('-');
    let fullFiles = await (fs.readdir('.' + fullPath) as Promise<string[]>);
    let fullFile = fullFiles.find(file => file.split('.')[0] == fileName);
    if (!fullFile) {
        throw new Error("Input file missing");
    }
    let extension = fullFile.split('.')[1];
    let thumbFile = thumb_file_name + '.' + extension;
    let thumbFiles = await (fs.readdir('.' + thumbPath) as Promise<string[]>);
    let index = thumbFiles.indexOf(thumbFile);
    if (index == -1) {
        const buffer = await sharp('.' + fullPath + fullFile)
            .resize({width: width, height: height, background: 'red'})
            .png()
            .toBuffer();
        const file = await fs.open('.' + thumbPath + thumbFile, 'a+');
        await file.write(buffer);
        file.close();
    }
    return [thumbPath, thumbFile]
}

export default {
    processFile
}
