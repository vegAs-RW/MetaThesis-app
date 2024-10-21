import { NewLabDirector, LabDirector, LabDirectorColumns } from "../entities/LabDirector";
import { LabDirectorRepository } from "../../infrastructure/repositories/LabDirectorRepository";

export class LabDirectorService {
    private labDirectorRepository: LabDirectorRepository;

    constructor() {
        this.labDirectorRepository = new LabDirectorRepository();
    }

    async createLabDirector(labDirector: NewLabDirector){
       const newLabDirector = await this.labDirectorRepository.createLabDirector(labDirector);
       return newLabDirector;
    }

    updateLabDirector(labDirector: LabDirector): void {
        this.labDirectorRepository.updateLabDirector(labDirector);
    }

    getAllLabDirectors() {
        return this.labDirectorRepository.getAllLabDirectors();
    }

    getLabDirectorById(id: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorById(id, columns || {id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: {name: true, city: true, country: true, address: true, means: true, expertise: true}});
    }

    getLabDirectorByLastname(lastname: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorByLastname(lastname, columns || {id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: {name: true, city: true, country: true, address: true, means: true, expertise: true}});
    }

    getLabDirectorByLabId(labId: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorByLabId(labId, columns || {id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: {name: true, city: true, country: true, address: true, means: true, expertise: true}});
    }

    getLabDirectorByLaboratory(labId: string, columns: LabDirectorColumns) {
        return this.labDirectorRepository.getLabDirectorByLaboratory(labId, columns || {id: true, email: true, lastname: true, firstname: true, phoneNumber: true, hdr: true, laboratory: {name: true, city: true, country: true, address: true, means: true, expertise: true}});
    }
}