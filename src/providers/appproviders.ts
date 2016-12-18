import { DataService } from '../shared/dataservice';
import { OrderByPipe } from '../shared/OrderByPipe' ;
import { GeoFireService } from '../shared/geofireService';
import {CategoryMappingsService} from "../shared/categoryMappingService"


export const APP_PROVIDERS = [
    DataService,
    OrderByPipe,
    GeoFireService,
    CategoryMappingsService
];
