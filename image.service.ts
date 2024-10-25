import { existsSync } from "fs"
import sharp from "sharp";

const isImageExisted = async (fileName: string) => {
  return existsSync(createImagePath(fileName));
}

const createImagePath = (fileName: string) => {
	return `./images/${fileName}.jpg`
}

const resizeImage = async (fileName: string, width: number, height: number) => {
	if(await isImageExisted(fileName)) {
		let a = await sharp(createImagePath(fileName))
		.resize(Number(width), Number(height))
		.png()
		.toBuffer();
		console.log(a);
		return await sharp(createImagePath(fileName))
				.resize(Number(width), Number(height))
				.png()
				.toBuffer();
	} else {
		throw new Error("Not found!");
	}
}

export { resizeImage, createImagePath, isImageExisted};