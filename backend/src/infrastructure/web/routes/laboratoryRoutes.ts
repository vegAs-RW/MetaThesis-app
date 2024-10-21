import express from 'express';
import { createLaboratory, updateLaboratory, getAllLaboratories, getLaboratoryByName, getLaboratoryByCity, getLaboratoryByCountry, getLaboratoryById } from '../controllers/LaboratoryController';
import { isAuth } from '../../../middlewares/authMiddleware';

const router = express.Router();

router.post("/", isAuth, createLaboratory);
router.put("/:id", isAuth, updateLaboratory);
router.get("/", isAuth, getAllLaboratories);
router.get("/:id", isAuth, getLaboratoryById);
router.get("/name/:name", isAuth, getLaboratoryByName);
router.get("/city/:city", isAuth, getLaboratoryByCity);
router.get("/country/:country", isAuth, getLaboratoryByCountry);

export default router;