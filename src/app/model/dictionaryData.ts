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
import { IterableBreed } from './iterableBreed';
import { IterableCity } from './iterableCity';
import { IterableParentTest } from './iterableParentTest';
import { IterablePuppyTest } from './iterablePuppyTest';


export interface DictionaryData { 
    breeds?: IterableBreed;
    cities?: IterableCity;
    parentTests?: IterableParentTest;
    puppyTests?: IterablePuppyTest;
}