import express from 'express';

const router = express.Router();

import { getUserInfo, updateUserInfo, postLoginUser, postRegisterUser, updateUserPassword} from '../controllers/signUp.js';

router.get('/account/:id', getUserInfo);
router.patch('/account/:id', updateUserInfo);
router.patch('/changePassword/:id', updateUserPassword);
router.post('/login', postLoginUser);
router.post('/register', postRegisterUser);


export default router;
