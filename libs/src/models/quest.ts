export enum QuestProperties {
    type = 'type',
    name = 'name',
    description = 'description',
    totalProgress = 'totalProgress',
    progress = 'progress',
    iconUrl = 'iconUrl',
}

export enum QuestTypes {
    TestsCompleted = 'TestsCompleted',
    QuestionsCompleted = 'QuestionsCompleted',
    EnergiesEarned = 'EnergiesEarned',
}

export interface Quest {
    [QuestProperties.type]: QuestTypes;
    [QuestProperties.name]: string;
    [QuestProperties.description]?: string;
    [QuestProperties.iconUrl]: string;
    [QuestProperties.totalProgress]: number;
    [QuestProperties.progress]: number;
}
