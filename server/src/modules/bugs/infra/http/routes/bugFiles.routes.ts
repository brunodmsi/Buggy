import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import BugFileController from '../controllers/BugFileController';

const bugFileController = new BugFileController();

const upload = multer(uploadConfig.multer);

const bugFilesRouter = Router();

bugFilesRouter.post(
  '/:bug_id/files',
  upload.single('file'),
  bugFileController.create,
);

bugFilesRouter.delete('/files/:bug_file_id', bugFileController.delete);

export default bugFilesRouter;
