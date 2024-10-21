import express from 'express';
import { createLabDirector, updateLabDirector, getAllLabDirectors, getLabDirectorById, getLabDirectorByLaboratory } from '../controllers/LabDirectorController';


const router = express.Router();

router.post('/', createLabDirector);
router.put('/:id', updateLabDirector);
router.get('/lab-directors', getAllLabDirectors);
router.get('/:id', getLabDirectorById);
router.get('/laboratory/:labId', getLabDirectorByLaboratory);

export default router;