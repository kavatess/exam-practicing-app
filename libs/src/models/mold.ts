import { QuestionDifficulties, QuestionTypes } from './question';
import { BaseModel } from './base';

export enum ExamMoldProperties {
    courseId = 'courseId',
    // testStructure = 'testStructure',
    // index = 'index',
    type = 'type',
    name = 'name',
    description = 'description',
    numOfQuestions = 'numOfQuestions',
    status = 'status',
}

export enum MoldStatuses {
    Active = 'Active',
    Inactive = 'Inactive',
}

export enum MoldTypes {
    Practice,
    Test,
}

export interface TestMold extends BaseModel {
    [ExamMoldProperties.courseId]?: string;
    [ExamMoldProperties.type]: MoldTypes;
    [ExamMoldProperties.name]: string;
    [ExamMoldProperties.description]: QuestionTypes[];
    [ExamMoldProperties.numOfQuestions]: number;
    [ExamMoldProperties.status]: MoldStatuses;
}

export enum MoldPageProperties {
    moldId = 'moldId',
    mold = 'mold',
    name = 'name',
    description = 'description',
    blocks = 'blocks',
    questions = 'questions',
}

export interface MoldPage extends BaseModel {
    [MoldPageProperties.moldId]: string;
    [MoldPageProperties.mold]?: TestMold;
    [MoldPageProperties.name]: string;
    [MoldPageProperties.description]: string;
    [MoldPageProperties.blocks]?: MoldBlock[];
}

export enum MoldBlockProperties {
    moldId = 'moldId',
    mold = 'mold',
    pageId = 'pageId',
    page = 'page',
    qType = 'qType',
    qIndex = 'qIndex',
    difficulty = 'difficulty',
    courseUnitId = 'courseUnitId',
    subUnitIds = 'subUnitIds',
}

export interface MoldBlock extends BaseModel {
    [MoldBlockProperties.moldId]: string;
    [MoldBlockProperties.mold]?: TestMold;
    [MoldBlockProperties.pageId]: string;
    [MoldBlockProperties.page]?: MoldPage;
    [MoldBlockProperties.qType]: QuestionTypes;
    [MoldBlockProperties.qIndex]: number;
    [MoldBlockProperties.difficulty]?: QuestionDifficulties;
    [MoldBlockProperties.courseUnitId]?: string;
    [MoldBlockProperties.subUnitIds]?: string[];
}
