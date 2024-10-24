import express from 'express';

import { updateUser, /*createUserAdmin*/ } from '../controllers/UserController';

const router = express.Router();

router.put('/:id', updateUser);
/*router.post('/admin', createUserAdmin);*/


export default router;