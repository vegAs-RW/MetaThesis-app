import express from 'express';
import { createCandidate, updateCandidate, getAllCandidates, getCandidateById, deleteCandidate } from '../controllers/CandidateController';

const router = express.Router();

router.post('/', createCandidate);
router.put('/:id', updateCandidate);
router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);
router.delete('/:id', deleteCandidate);

export default router;