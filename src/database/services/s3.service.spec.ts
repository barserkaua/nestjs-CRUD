import { S3Service } from './s3.service';
import { S3 } from 'aws-sdk';

describe('S3Service', () => {
  let s3Service: S3Service;
  let s3Mock: S3;

  beforeEach(() => {
    s3Mock = {} as S3;
    s3Service = new S3Service(s3Mock);
  });

  describe('uploadFile', () => {
    it('should upload a file to S3', async () => {
      const file = {
        originalname: 'test.jpg',
        buffer: Buffer.from('file content'),
      } as Express.Multer.File;

      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
      };

      const uploadResult = {
        Location: 'https://s3.amazonaws.com/bucket/test.jpg',
        Key: 'test.jpg',
      };

      s3Mock.upload = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue(uploadResult),
      });

      const result = await s3Service.uploadFile(file);

      expect(s3Mock.upload).toHaveBeenCalledWith(uploadParams);
      expect(result).toEqual(uploadResult);
    });
  });

  describe('getFile', () => {
    it('should get a file from S3', async () => {
      const key = 'test.jpg';

      const getParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      };

      const getResult = {
        Body: Buffer.from('file content'),
      };

      s3Mock.getObject = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue(getResult),
      });

      const result = await s3Service.getFile(key);

      expect(s3Mock.getObject).toHaveBeenCalledWith(getParams);
      expect(result).toEqual(getResult);
    });
  });

  describe('deleteFile', () => {
    it('should delete a file from S3', async () => {
      const key = 'test.jpg';

      const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      };

      const deleteResult = {};

      s3Mock.deleteObject = jest.fn().mockReturnValue({
        promise: jest.fn().mockResolvedValue(deleteResult),
      });

      const result = await s3Service.deleteFile(key);

      expect(s3Mock.deleteObject).toHaveBeenCalledWith(deleteParams);
      expect(result).toEqual(deleteResult);
    });
  });
});
