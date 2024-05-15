import { AWSError, S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { PromiseResult } from 'aws-sdk/lib/request';

Injectable();
export class S3Service {
  private readonly BUCKET = process.env.S3_BUCKET_NAME;

  s3 = new S3({
    region: process.env.S3_BUCKET_REGION,
    endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  public async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return await this.s3.upload(params).promise();
  }

  public async getFile(
    key: string,
  ): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    const params = {
      Bucket: this.BUCKET,
      Key: key,
    };
    return this.s3.getObject(params).promise();
  }

  public async deleteFile(
    key: string,
  ): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> {
    const params = {
      Bucket: this.BUCKET,
      Key: key,
    };
    return this.s3.deleteObject(params).promise();
  }
}
