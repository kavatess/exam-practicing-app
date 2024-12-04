import { BaseModel } from "./base";

export enum MediaProperties {
    url = 'url',
    type = 'type',
}

export interface Media extends BaseModel {
    [MediaProperties.url]: string;
    [MediaProperties.type]: string;
}
