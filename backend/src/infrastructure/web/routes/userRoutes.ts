import express from 'express';

import { updateUser } from '../controllers/UserController';

const router = express.Router();

router.put('/:id', updateUser);


export default router;