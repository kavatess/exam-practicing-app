import { BaseModel } from './base';
import { Question, QuestionTypes } from './question';
import { Course, Subject, SubjectUnit } from './subject';
import { User } from './user';

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
    testQuestionIds = 'testQuestionIds',
    questions = 'questions',
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
    [TestProperties.units]?: SubjectUnit[];
    [TestProperties.questionTypes]: QuestionTypes[];
    [TestProperties.duration]: number;
    [TestProperties.startTime]: Date;
    [TestProperties.endTime]: Date;
    [TestProperties.totalScore]: number;
    [TestProperties.score]: number;
    [TestProperties.status]: string;
    [TestProperties.testQuestionIds]: string[];
    [TestProperties.questions]?: TestQuestion[];
    // [TestProperties.description]: string;
}

export enum TestQuestionProperties {
    userId = 'userId',
    testId = 'testId',
    questionId = 'questionId',
    question = 'question',
    isCorrect = 'isCorrect',
    point = 'point',
}

export interface TestQuestion extends BaseModel {
    [TestQuestionProperties.userId]: string;
    [TestQuestionProperties.testId]: string;
    [TestQuestionProperties.questionId]: string;
    [TestQuestionProperties.question]?: Question;
    [TestQuestionProperties.isCorrect]: boolean;
    [TestQuestionProperties.point]: number;
}

// export enum TestStructureProperties {
//     testId = 'testId',
//     test = 'test',
//     subjectId = 'subjectId',
//     subject = 'subject',
//     courseId = 'courseId',
//     course = 'course',
//     type = 'type',
//     numOfQuestions = 'numOfQuestions',
//     difficulty = 'difficulty',
//     unitIds = 'unitIds',
//     units = 'units',
//     // subUnitIds = 'subUnitIds',
//     // subUnits = 'subUnits',
//     questionTypes = 'questionTypes',
// }

export enum TestDifficulties {
    Easy = 'Easy',
    Normal = 'Normal',
    Advanced = 'Advanced',
}

export enum TestMoldTypes {
    Base = 'Base',
    Predefined = 'Predefined',
    Customized = 'Customized',
}

// export interface TestStructure extends BaseModel {
//     [TestStructureProperties.testId]: string;
//     [TestStructureProperties.test]?: Test;
//     [TestStructureProperties.subjectId]: string;
//     [TestStructureProperties.subject]?: Subject;
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

export enum TestMoldProperties {
    testId = 'testId',
    // testStructure = 'testStructure',
    // index = 'index',
    type = 'type',
    numOfQuestions = 'numOfQuestions',
    difficulty = 'difficulty',
    unitIds = 'unitIds',
    units = 'units',
    // subUnitIds = 'subUnitIds',
    // subUnits = 'subUnits',
    questionTypes = 'questionTypes',
}

export interface TestMold extends BaseModel {
    [TestMoldProperties.testId]?: string;
    // [TestMoldProperties.testStructure]?: TestStructure;
    [TestMoldProperties.type]: TestMoldTypes;
    [TestMoldProperties.numOfQuestions]: number;
    [TestMoldProperties.difficulty]: TestDifficulties;
    [TestMoldProperties.unitIds]: string[];
    [TestMoldProperties.units]?: SubjectUnit[];
    // [TestMoldProperties.subUnitIds]: string[];
    // [TestMoldProperties.subUnits]?: SubUnit[];
    [TestMoldProperties.questionTypes]: QuestionTypes[];
}
