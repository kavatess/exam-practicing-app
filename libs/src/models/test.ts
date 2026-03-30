import { BaseModel } from './base';
import { QuestionData, QuestionTypes } from './question';
import { User } from './user';
import { MoldPage } from './mold';
import { Course, Subject, SubUnit } from './subject';

export enum TestProperties {
    // structureId = 'structureId',
    structure = 'structure',
    userId = 'userId',
    user = 'user',
    name = 'name',
    type = 'type',
    difficulty = 'difficulty',
    subjectId = 'subjectId',
    subject = 'subject',
    courseId = 'courseId',
    course = 'course',
    unitIds = 'unitIds',
    units = 'units',
    questionTypes = 'questionTypes',
    numOfQuestions = 'numOfQuestions',
    duration = 'duration',
    startTime = 'startTime',
    endTime = 'endTime',
    totalScore = 'totalScore',
    score = 'score',
    status = 'status',
    questions = 'questions',
    pages = 'pages',
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
    // [TestProperties.structureId]: string;
    [TestProperties.subjectId]: string;
    [TestProperties.subject]?: Subject;
    [TestProperties.courseId]: string;
    [TestProperties.course]?: Course;
    // [TestProperties.structure]?: TestStructure;
    [TestProperties.userId]: string;
    [TestProperties.user]?: User;
    [TestProperties.name]: string;
    [TestProperties.type]: TestTypes;
    [TestProperties.numOfQuestions]: number;
    [TestProperties.difficulty]: TestDifficulties;
    [TestProperties.unitIds]: string[];
    [TestProperties.units]?: SubUnit[];
    [TestProperties.questionTypes]: QuestionTypes[];
    [TestProperties.duration]: number;
    [TestProperties.startTime]: Date;
    [TestProperties.endTime]: Date;
    [TestProperties.totalScore]: number;
    [TestProperties.score]: number;
    [TestProperties.status]: string;
    [TestProperties.questions]?: TestQuestion[];
    [TestProperties.pages]?: TestPage[];
    // [TestProperties.description]: string;
}

export enum TestQuestionProperties {
    userId = 'userId',
    testId = 'testId',
    questionId = 'questionId',
    question = 'question',
    isCorrect = 'isCorrect',
    points = 'points',
}

export interface TestQuestion extends QuestionData {
    [TestQuestionProperties.testId]?: string;
}

export interface TestPage extends MoldPage {
    questions: TestQuestion[];
}

export enum TestDifficulties {
    VeryEasy = 'VeryEasy',
    Easy = 'Easy',
    Normal = 'Normal',
    Advanced = 'Advanced',
    Hard = 'Hard',
}

// export interface TestStructure extends BaseModel {
//     [TestStructureProperties.testId]: string;
//     [TestStructureProperties.test]?: Test;
//     [TestStructureProperties.subjectId]: string;
//     [TestStructureProperties.subject]?: Course;
//     [TestStructureProperties.courseId]: string;
//     [TestStructureProperties.course]?: Course;
//     [TestStructureProperties.type]: TestStructureTypes;
//     [TestStructureProperties.numOfQuestions]: number;
//     [TestStructureProperties.difficulty]?: TestDifficulties;
//     [TestStructureProperties.unitIds]?: string[];
//     [TestStructureProperties.units]?: SubjectUnit[];
//     // [TestStructureProperties.subUnitIds]?: string[];
//     // [TestStructureProperties.subUnits]?: SubUnit[];
//     [TestStructureProperties.questionTypes]?: QuestionTypes[];
// }
