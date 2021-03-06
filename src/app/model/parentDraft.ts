/**
 * Petman REST API
 * Petman REST API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Breed } from './breed';
import { Photo } from './photo';


export interface ParentDraft { 
    breed?: Breed;
    gallery?: Array<Photo>;
    gender?: ParentDraft.GenderEnum;
    id?: number;
    info?: string;
    nickname?: string;
}
export namespace ParentDraft {
    export type GenderEnum = 'MALE' | 'FEMALE';
    export const GenderEnum = {
        MALE: 'MALE' as GenderEnum,
        FEMALE: 'FEMALE' as GenderEnum
    };
}
