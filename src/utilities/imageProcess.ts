import sharp from 'sharp';
import { promises as fs } from 'fs';

async function processFile(
  fileName: string,
  stringWidth: string,
  stringHeight: string
): Promise<[string, string, boolean]> {
  if (!fileName || !stringWidth || !stringHeight) {
    throw new Error('missing file properties');
  }
  const fullPath = '/assets/images/full/';
  const thumbPath = '/assets/images/thumb/';
  let height, width;
  if (stringWidth) {
    height = parseInt(stringHeight, 10);
  }
  if (stringHeight) {
    width = parseInt(stringWidth, 10);
  }
  const nameArray = [fileName, stringWidth, stringHeight];
  const thumb_file_name = nameArray.join('-');
  const fullFiles = await (fs.readdir('.' + fullPath) as Promise<string[]>);
  const fullFile = fullFiles.find(file => file.split('.')[0] == fileName);
  if (!fullFile) {
    throw new Error('Input file missing');
  }
  const extension = fullFile.split('.')[1];
  const thumbFile = thumb_file_name + '.' + extension;
  const thumbFiles = await (fs.readdir('.' + thumbPath) as Promise<string[]>);
  const index = thumbFiles.indexOf(thumbFile);
  let imageCreated = false;
  if (index == -1) {
    const buffer = await startProcess(fullPath, fullFile, width, height);
    const file = await fs.open('.' + thumbPath + thumbFile, 'a+');
    await file.write(buffer);
    imageCreated = true;
    file.close();
  }
  return [thumbPath, thumbFile, imageCreated];
}

async function startProcess(
  fullPath: string,
  fullFile: string,
  width: number | undefined,
  height: number | undefined
): Promise<Buffer> {
  return sharp('.' + fullPath + fullFile)
    .resize({ width: width, height: height, background: 'red' })
    .png()
    .toBuffer();
}

export default {
  processFile
};
