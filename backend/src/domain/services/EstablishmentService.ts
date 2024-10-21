import { Establishment, NewEstablishment, EstablishmentColumns } from "../entities/Establishment";
import { EstablishmentRepository } from "../../infrastructure/repositories/EstablishmentRepository";

export class EstablishmentService {
    private establishmentRepository: EstablishmentRepository;

    constructor() {
        this.establishmentRepository = new EstablishmentRepository();
    }

    async createEstablishment(establishment: NewEstablishment){
       const newEstablishment = await this.establishmentRepository.createEstablishment(establishment);
       return newEstablishment;
    }

    updateEstablishment(establishment: Establishment): void {
        this.establishmentRepository.updateEstablishment(establishment);
    }

    getAllEstablishments() {
        return this.establishmentRepository.getAllEstablishments();
    }

    getEstablishmentById(id: string, columns: EstablishmentColumns) {
        return this.establishmentRepository.getEstablishmentById(id, columns || {id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true});
    }

    getEstablishmentByName(name: string, columns: EstablishmentColumns) {
        return this.establishmentRepository.getEstablishmentByName(name, columns || {id: true, name: true, siret: true, address: true, zipcode: true, city: true, telephone: true});
    }

    deleteEstablishment(id: string) {
        return this.establishmentRepository.deleteEstablishment(id);
    }
}