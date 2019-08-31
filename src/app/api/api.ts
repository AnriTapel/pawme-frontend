export * from './adminController.service';
import { AdminControllerService } from './adminController.service';
export * from './breederController.service';
import { BreederControllerService } from './breederController.service';
export * from './dictionaryController.service';
import { DictionaryControllerService } from './dictionaryController.service';
export * from './mediaController.service';
import { MediaControllerService } from './mediaController.service';
export const APIS = [AdminControllerService, BreederControllerService, DictionaryControllerService, MediaControllerService];
