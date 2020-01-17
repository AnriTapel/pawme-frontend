import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AboutControllerService } from './api/aboutController.service';
import { AdminControllerService } from './api/adminController.service';
import { BreederControllerService } from './api/breederController.service';
import { CustomerControllerService } from './api/customerController.service';
import { DictionaryControllerService } from './api/dictionaryController.service';
import { MediaControllerService } from './api/mediaController.service';
import { SearchControllerService } from './api/searchController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AboutControllerService,
    AdminControllerService,
    BreederControllerService,
    CustomerControllerService,
    DictionaryControllerService,
    MediaControllerService,
    SearchControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
