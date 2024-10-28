import { NextFunction, Request, Response } from 'express';
import { existsSync } from 'fs';
import sharp from 'sharp';
import { ValidationError } from './error';

const isImageExisted = async (fileName: string) => {
  return existsSync(createImagePath(fileName));
};

const createImagePath = (fileName: string) => {
  return `./images/${fileName}.jpg`;
};

const resizeImage = async (fileName: string, width: number, height: number) => {
  return await sharp(createImagePath(fileName))
    .resize(Number(width), Number(height))
    .png()
    .toBuffer();
};

const validateInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName, width, height } = req.query;

  if (fileName === undefined || width === undefined || height === undefined) {
    next(new ValidationError('Missing filename, height or width!'));
  }

  if (fileName !== undefined && !(await isImageExisted(fileName.toString()))) {
    next(new ValidationError('Invalid input for filename: ' + fileName));
  }

  if (Number(width) === 0 || Number(height) === 0) {
    next(new ValidationError('Invalid input for height or width'));
  }

  try {
    sharp(createImagePath(fileName as string))
      .resize(Number(width), Number(height))
      .png()
      .toBuffer();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    next(new ValidationError('Invalid input for height or width'));
  }

  next();
};

export { resizeImage, createImagePath, isImageExisted, validateInput };
