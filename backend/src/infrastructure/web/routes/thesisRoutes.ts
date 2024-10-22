import express from 'express';
import { createThesis, getAllTheses, getThesisById, validateThesisTopic, updateJobVacancy, assignCandidateToThesis, addAnrtNumberToThesis } from '../controllers/ThesisController';


const router = express.Router();

router.post('/', createThesis);
router.get('/', getAllTheses);
router.get('/:id', getThesisById);
router.put('/:id/validate-topic', validateThesisTopic);
router.put('/:id/update-job-vacancy', updateJobVacancy);
router.put('/:id/assign-candidate', assignCandidateToThesis);
router.put('/:id/add-anrt-number', addAnrtNumberToThesis);


export default router;