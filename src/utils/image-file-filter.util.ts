import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';

export const ImageFileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: (error: UnsupportedMediaTypeException | null, bool: boolean) => any,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new UnsupportedMediaTypeException('Only image files are supported'),
      false,
    );
  }
  callback(null, true);
};
