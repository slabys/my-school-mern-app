import express from 'express';

const router = express.Router();

import { getUserInfo, updateUserInfo, postLoginUser, postRegisterUser} from '../controllers/signUp.js';

router.get('/account/:id', getUserInfo);
router.patch('/account/:id', updateUserInfo);
router.post('/login', postLoginUser);
router.post('/register', postRegisterUser);


export default router;
