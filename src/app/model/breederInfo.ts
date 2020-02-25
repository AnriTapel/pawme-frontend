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
import { City } from './city';
import { Photo } from './photo';


export interface BreederInfo { 
    alias?: string;
    city?: City;
    description: string;
    extraBreed?: Breed;
    extraBreed1?: Breed;
    facebook?: string;
    gallery?: Array<Photo>;
    id?: number;
    instagram?: string;
    mainBreed: Breed;
    name: string;
    profilePhoto?: Photo;
    site?: string;
}
