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


export interface Admin { 
    createDate?: Date;
    id?: number;
    name: string;
    phone?: string;
    roles?: Array<string>;
    status?: Admin.StatusEnum;
    surname: string;
}
export namespace Admin {
    export type StatusEnum = 'UNCONFIRMED' | 'ACTIVE' | 'HIDDEN' | 'BLOCKED' | 'DELETED';
    export const StatusEnum = {
        UNCONFIRMED: 'UNCONFIRMED' as StatusEnum,
        ACTIVE: 'ACTIVE' as StatusEnum,
        HIDDEN: 'HIDDEN' as StatusEnum,
        BLOCKED: 'BLOCKED' as StatusEnum,
        DELETED: 'DELETED' as StatusEnum
    };
}
