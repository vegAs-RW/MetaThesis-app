import express from 'express';
import { createLaboratory, updateLaboratory, getAllLaboratories, getLaboratoryByName, getLaboratoryByCity, getLaboratoryByCountry, getLaboratoryById } from '../controllers/LaboratoryController';

const router = express.Router();

router.post("/", createLaboratory);
router.put("/:id", updateLaboratory);
router.get("/", getAllLaboratories);
router.get("/:id", getLaboratoryById);
router.get("/name/:name", getLaboratoryByName);
router.get("/city/:city", getLaboratoryByCity);
router.get("/country/:country", getLaboratoryByCountry);

export default router;