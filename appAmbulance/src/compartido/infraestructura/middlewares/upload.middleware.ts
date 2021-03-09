import multer from 'multer';
import multer_s3 from 'multer-s3';
import AWS from 'aws-sdk';
import yenv from 'yenv';
import { IError } from '../errors';

const env = yenv();

AWS.config.update({ region: 'us-east-2' });

const s3 = new AWS.S3({
	accessKeyId: 'aaaaaaa',
	secretAccessKey: 'xxxxx',
});

export class Upload {
	static S3(fileName: string) {
		return multer({
			storage: multer_s3({
				s3: s3,
				bucket: env.BUCKET.NAME,
				acl: 'public-read',
				metadata(req, file, cb) {
					cb(null, { fileName: file.fieldname });
				},
				key(req: any, file, cb) {
					const partsFile = file.originalname.split('.');

					if (!file.mimetype.startsWith('image/')) {
						const error: IError = new Error("It's not a image");
						error.status = 500;
						cb(error);
					} else if (partsFile.length == 1) {
						const error: IError = new Error('Image without extension');
						error.status = 500;
						cb(error);
					} else {
						const extension = partsFile[1];
						const name = Date.now().toString();
						const newFileName = name + '.' + extension;
						req.body['foto'] = newFileName;
						cb(null, file.originalname);
					}
				},
			}),
		}).single(fileName);
	}
}
