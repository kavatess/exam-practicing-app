import { BaseModel } from './base';

export enum SubjectProperties {
    name = 'name',
    description = 'description',
}

export interface Subject extends BaseModel {
    [SubjectProperties.name]: string;
    [SubjectProperties.description]: string;
}

export enum SubjectUnitProperties {
    subjectId = 'subjectId',
    title = 'title',
    description = 'description',
}

export interface SubjectUnit extends BaseModel {
    [SubjectUnitProperties.subjectId]: string;
    [SubjectUnitProperties.title]: string;
    [SubjectUnitProperties.description]: string;
}

export enum SubUnitProperties {
    unitId = 'unitId',
    title = 'title',
    description = 'description',
}

export interface SubUnit extends BaseModel {
    [SubUnitProperties.unitId]: string;
    [SubUnitProperties.title]: string;
    [SubUnitProperties.description]: string;
}

export enum CourseProperties {
    subjectId = 'subjectId',
    name = 'name',
    unitIds = 'unitIds',
    description = 'description',
}

export interface Course extends BaseModel {
    [CourseProperties.subjectId]: string;
    [CourseProperties.name]: string;
    [CourseProperties.unitIds]: string[];
    [CourseProperties.description]: string;
}
