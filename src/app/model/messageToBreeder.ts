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
import { Breeder } from './breeder';


export interface MessageToBreeder { 
    breeder?: Breeder;
    createDate?: Date;
    email: string;
    id?: number;
    message: string;
    name: string;
    phone: string;
}
