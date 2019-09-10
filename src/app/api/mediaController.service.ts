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

import { Iterable } from '../model/iterable';
import { Photo } from '../model/photo';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MediaControllerService {

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
     * View a list of available languages
     * 
     * @param image 
     * @param rectHeight 
     * @param rectLeft 
     * @param rectTop 
     * @param rectWidth 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadAvatarUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'body', reportProgress?: boolean): Observable<Iterable>;
    public uploadAvatarUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Iterable>>;
    public uploadAvatarUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Iterable>>;
    public uploadAvatarUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (image !== undefined && image !== null) {
            queryParameters = queryParameters.set('image', <any>image);
        }
        if (rectHeight !== undefined && rectHeight !== null) {
            queryParameters = queryParameters.set('rect.height', <any>rectHeight);
        }
        if (rectLeft !== undefined && rectLeft !== null) {
            queryParameters = queryParameters.set('rect.left', <any>rectLeft);
        }
        if (rectTop !== undefined && rectTop !== null) {
            queryParameters = queryParameters.set('rect.top', <any>rectTop);
        }
        if (rectWidth !== undefined && rectWidth !== null) {
            queryParameters = queryParameters.set('rect.width', <any>rectWidth);
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

        return this.httpClient.post<Iterable>(`${this.basePath}/api/upload/avatar`,
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

    /**
     * uploadGallery
     * 
     * @param image 
     * @param rectHeight 
     * @param rectLeft 
     * @param rectTop 
     * @param rectWidth 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadGalleryUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'body', reportProgress?: boolean): Observable<Photo>;
    public uploadGalleryUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Photo>>;
    public uploadGalleryUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Photo>>;
    public uploadGalleryUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (image !== undefined && image !== null) {
            queryParameters = queryParameters.set('image', <any>image);
        }
        if (rectHeight !== undefined && rectHeight !== null) {
            queryParameters = queryParameters.set('rect.height', <any>rectHeight);
        }
        if (rectLeft !== undefined && rectLeft !== null) {
            queryParameters = queryParameters.set('rect.left', <any>rectLeft);
        }
        if (rectTop !== undefined && rectTop !== null) {
            queryParameters = queryParameters.set('rect.top', <any>rectTop);
        }
        if (rectWidth !== undefined && rectWidth !== null) {
            queryParameters = queryParameters.set('rect.width', <any>rectWidth);
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

        return this.httpClient.post<Photo>(`${this.basePath}/api/upload/gallery`,
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

    /**
     * uploadPersonal
     * 
     * @param image 
     * @param rectHeight 
     * @param rectLeft 
     * @param rectTop 
     * @param rectWidth 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadPersonalUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'body', reportProgress?: boolean): Observable<Photo>;
    public uploadPersonalUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Photo>>;
    public uploadPersonalUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Photo>>;
    public uploadPersonalUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (image !== undefined && image !== null) {
            queryParameters = queryParameters.set('image', <any>image);
        }
        if (rectHeight !== undefined && rectHeight !== null) {
            queryParameters = queryParameters.set('rect.height', <any>rectHeight);
        }
        if (rectLeft !== undefined && rectLeft !== null) {
            queryParameters = queryParameters.set('rect.left', <any>rectLeft);
        }
        if (rectTop !== undefined && rectTop !== null) {
            queryParameters = queryParameters.set('rect.top', <any>rectTop);
        }
        if (rectWidth !== undefined && rectWidth !== null) {
            queryParameters = queryParameters.set('rect.width', <any>rectWidth);
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

        return this.httpClient.post<Photo>(`${this.basePath}/api/upload/personal`,
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

    /**
     * uploadPet
     * 
     * @param image 
     * @param rectHeight 
     * @param rectLeft 
     * @param rectTop 
     * @param rectWidth 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadPetUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'body', reportProgress?: boolean): Observable<Photo>;
    public uploadPetUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Photo>>;
    public uploadPetUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Photo>>;
    public uploadPetUsingPOST(image?: Blob, rectHeight?: number, rectLeft?: number, rectTop?: number, rectWidth?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (image !== undefined && image !== null) {
            queryParameters = queryParameters.set('image', <any>image);
        }
        if (rectHeight !== undefined && rectHeight !== null) {
            queryParameters = queryParameters.set('rect.height', <any>rectHeight);
        }
        if (rectLeft !== undefined && rectLeft !== null) {
            queryParameters = queryParameters.set('rect.left', <any>rectLeft);
        }
        if (rectTop !== undefined && rectTop !== null) {
            queryParameters = queryParameters.set('rect.top', <any>rectTop);
        }
        if (rectWidth !== undefined && rectWidth !== null) {
            queryParameters = queryParameters.set('rect.width', <any>rectWidth);
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

        return this.httpClient.post<Photo>(`${this.basePath}/api/upload/pet`,
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
