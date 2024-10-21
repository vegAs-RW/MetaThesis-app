import express  from "express";
import { createEstablishment, updateEstablishment, getAllEstablishments, getEstablishmentById, getEstablishmentByName, deleteEstablishment } from "../controllers/EstablishmentController";


const router = express.Router();

router.post("/", createEstablishment);
router.put("/:id", updateEstablishment);
router.get("/", getAllEstablishments);
router.get("/:id", getEstablishmentById);
router.get("/name/:name", getEstablishmentByName);
router.delete("/:id", deleteEstablishment);

export default router;