import express from 'express';

const router = express.Router();

import { getLoginUser, postLoginUser } from '../controllers/login.js';

router.post('/', getLoginUser);
router.get('/', postLoginUser);

export default router;
