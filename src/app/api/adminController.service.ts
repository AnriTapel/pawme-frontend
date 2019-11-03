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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Breed } from '../model/breed';
import { BreederForAdmin } from '../model/breederForAdmin';
import { MessageToBreeder } from '../model/messageToBreeder';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AdminControllerService {

    protected basePath = '';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * addBreed
     * 
     * @param breed breed
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addBreedUsingPUT(breed: Breed, observe?: 'body', reportProgress?: boolean): Observable<Breed>;
    public addBreedUsingPUT(breed: Breed, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Breed>>;
    public addBreedUsingPUT(breed: Breed, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Breed>>;
    public addBreedUsingPUT(breed: Breed, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (breed === null || breed === undefined) {
            throw new Error('Required parameter breed was null or undefined when calling addBreedUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<Breed>(`${this.basePath}/api/admin/breed`,
            breed,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listBreeders
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listBreedersUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<BreederForAdmin>>;
    public listBreedersUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<BreederForAdmin>>>;
    public listBreedersUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BreederForAdmin>>>;
    public listBreedersUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<BreederForAdmin>>(`${this.basePath}/api/admin/breeders`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listMessages
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listMessagesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<MessageToBreeder>>;
    public listMessagesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MessageToBreeder>>>;
    public listMessagesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MessageToBreeder>>>;
    public listMessagesUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<MessageToBreeder>>(`${this.basePath}/api/admin/messages`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateStatus
     * 
     * @param id id
     * @param status status
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateStatusUsingPUT(id: number, status: 'UNCONFIRMED' | 'ACTIVE' | 'HIDDEN' | 'BLOCKED' | 'DELETED', observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateStatusUsingPUT(id: number, status: 'UNCONFIRMED' | 'ACTIVE' | 'HIDDEN' | 'BLOCKED' | 'DELETED', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateStatusUsingPUT(id: number, status: 'UNCONFIRMED' | 'ACTIVE' | 'HIDDEN' | 'BLOCKED' | 'DELETED', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateStatusUsingPUT(id: number, status: 'UNCONFIRMED' | 'ACTIVE' | 'HIDDEN' | 'BLOCKED' | 'DELETED', observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateStatusUsingPUT.');
        }

        if (status === null || status === undefined) {
            throw new Error('Required parameter status was null or undefined when calling updateStatusUsingPUT.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (status !== undefined && status !== null) {
            queryParameters = queryParameters.set('status', <any>status);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<any>(`${this.basePath}/api/admin/status/${encodeURIComponent(String(id))}`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
