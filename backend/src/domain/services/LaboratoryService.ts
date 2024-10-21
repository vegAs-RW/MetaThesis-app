import { Laboratory, NewLaboratory, LaboratoryColumns } from "../entities/Laboratory";
import { LaboratoryRepository } from "../../infrastructure/repositories/LaboratoryRepository";

export class LaboratoryService {
    private laboratoryRepository: LaboratoryRepository;

    constructor() {
        this.laboratoryRepository = new LaboratoryRepository();
    }

    async createLaboratory(laboratory: NewLaboratory){
       const newLaboratory = await this.laboratoryRepository.createLaboratory(laboratory);
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