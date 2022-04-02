import express from 'express';

const router = express.Router();

import { postLoginUser, postRegisterUser } from '../controllers/signUp.js';

router.post('/login', postLoginUser);
router.post('/register', postRegisterUser);

export default router;
