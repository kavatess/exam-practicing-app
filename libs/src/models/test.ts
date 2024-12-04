import { BaseModel } from './base';
import { Question, QuestionDifficulties, QuestionTypes } from './question';
import { Course, Subject, SubjectUnit, SubUnit } from './subject';
import { User } from './user';

export enum TestProperties {
    structureId = 'structureId',
    structure = 'structure',
    userId = 'userId',
    user = 'user',
    name = 'name',
    type = 'type',
    subjectId = 'subjectId',
    subject = 'subject',
    courseId = 'courseId',
    course = 'course',
    duration = 'duration',
    startTime = 'startTime',
    endTime = 'endTime',
    totalScore = 'totalScore',
    score = 'score',
    status = 'status',
    // description = 'description',
}

export enum TestTypes {
    Standard = 'Standard',
    Practice = 'Practice',
}

export enum TestStatus {
    Created = 'Created',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export interface Test extends BaseModel {
    [TestProperties.structureId]: string;
    [TestProperties.structure]?: TestStructure;
    [TestProperties.userId]: string;
    [TestProperties.user]?: User;
    [TestProperties.name]: string;
    [TestProperties.type]: string;
    [TestProperties.subjectId]: string;
    [TestProperties.subject]?: Subject;
    [TestProperties.courseId]: string;
    [TestProperties.course]?: Course;
    [TestProperties.duration]: number;
    [TestProperties.startTime]: Date;
    [TestProperties.endTime]: Date;
    [TestProperties.totalScore]: number;
    [TestProperties.score]: number;
    [TestProperties.status]: string;
    // [TestProperties.description]: string;
}

export enum TestQuestionProperties {
    testId = 'testId',
    questionId = 'questionId',
    question = 'question',
    isCorrect = 'isCorrect',
    point = 'point',
}

export interface TestQuestion extends BaseModel {
    [TestQuestionProperties.testId]: string;
    [TestQuestionProperties.questionId]: string;
    [TestQuestionProperties.question]?: Question;
    [TestQuestionProperties.isCorrect]: boolean;
    [TestQuestionProperties.point]: number;
}

export enum TestStructureProperties {
    subjectId = 'subjectId',
    subject = 'subject',
    courseId = 'courseId',
    course = 'course',
    type = 'type',
    difficulty = 'difficulty',
    unitIds = 'unitIds',
    units = 'units',
    subUnitIds = 'subUnitIds',
    subUnits = 'subUnits',
    questionTypes = 'questionTypes',
}

export enum TestStructureTypes {
    Molding = 'Molding',
    Customizing = 'Customizing',
}

export interface TestStructure extends BaseModel {
    [TestStructureProperties.subjectId]: string;
    [TestStructureProperties.subject]?: Subject;
    [TestStructureProperties.courseId]: string;
    [TestStructureProperties.course]?: Course;
    [TestStructureProperties.type]: string;
    [TestStructureProperties.difficulty]?: QuestionDifficulties;
    [TestStructureProperties.unitIds]?: string[];
    [TestStructureProperties.units]?: SubjectUnit[];
    [TestStructureProperties.subUnitIds]?: string[];
    [TestStructureProperties.subUnits]?: SubUnit[];
    [TestStructureProperties.questionTypes]?: QuestionTypes[];
}

export enum StructureMoldingProperties {
    testStructureId = 'testStructureId',
    testStructure = 'testStructure',
    questionId = 'questionId',
    difficulty = 'difficulty',
    unitIds = 'unitIds',
    units = 'units',
    subUnitIds = 'subUnitIds',
    subUnits = 'subUnits',
    questionType = 'questionType',
}

export interface StructureMolding extends BaseModel {
    [StructureMoldingProperties.testStructureId]: string;
    [StructureMoldingProperties.testStructure]?: TestStructure;
    [StructureMoldingProperties.questionId]: string;
    [StructureMoldingProperties.difficulty]: QuestionDifficulties;
    [StructureMoldingProperties.unitIds]: string[];
    [StructureMoldingProperties.units]?: SubjectUnit[];
    [StructureMoldingProperties.subUnitIds]: string[];
    [StructureMoldingProperties.subUnits]?: SubUnit[];
    [StructureMoldingProperties.questionType]: QuestionTypes;
}
