import { Laboratory, NewLaboratory, LaboratoryColumns } from "../entities/Laboratory";
import { LaboratoryRepository } from "../../infrastructure/repositories/LaboratoryRepository";
import { LabDirectorRepository } from "../../infrastructure/repositories/LabDirectorRepository";
import { NewLabDirector } from "../entities/LabDirector";
export class LaboratoryService {
    private laboratoryRepository: LaboratoryRepository;
    private directorRepository: LabDirectorRepository;

    constructor() {
        this.laboratoryRepository = new LaboratoryRepository();
        this.directorRepository = new LabDirectorRepository();
    }

    async createLaboratory(laboratory: NewLaboratory, director: NewLabDirector){
       const newLaboratory = await this.laboratoryRepository.createLaboratory(laboratory);
       
       if (!newLaboratory) throw new Error("An error occurred while creating laboratory");
       
       director.laboratory = newLaboratory.id;
       await this.directorRepository.createLabDirector(director);

       return newLaboratory;
    }

    updateLaboratory(laboratory: Laboratory): void {
        this.laboratoryRepository.updateLaboratory(laboratory);
    }

    getAllLaboratories() {
        return this.laboratoryRepository.getAllLaboratories();
    }

    getLaboratoryById(id: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryById(id, columns || {id: true, name: true, address: true, city: true, country: true, means: true, expertise: true});
    }

    getLaboratoryByName(name: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryByName(name, columns || {id: true, name: true, address: true, city: true, country: true, means: true, expertise: true});
    }

    getLaboratoryByCity(city: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryByCity(city, columns || {id: true, name: true, address: true, city: true, country: true, means: true, expertise: true});
    }

    getLaboratoryByCountry(country: string, columns: LaboratoryColumns) {
        return this.laboratoryRepository.getLaboratoryByCountry(country, columns || {id: true, name: true, address: true, city: true, country: true, means: true, expertise: true});
    }
}