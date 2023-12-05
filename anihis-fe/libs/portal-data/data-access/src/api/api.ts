export * from './animals.service';
import { AnimalsService } from './animals.service';
export * from './owners.service';
import { OwnersService } from './owners.service';
export * from './payments.service';
import { PaymentsService } from './payments.service';
export * from './species.service';
import { SpeciesService } from './species.service';
export * from './veterinarians.service';
import { VeterinariansService } from './veterinarians.service';
export * from './veterinaryClinicsControllers.service';
import { VeterinaryClinicsControllersService } from './veterinaryClinicsControllers.service';
export const APIS = [AnimalsService, OwnersService, PaymentsService, SpeciesService, VeterinariansService, VeterinaryClinicsControllersService];
