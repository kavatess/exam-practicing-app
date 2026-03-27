import { BaseModel } from './base';
import { UserAchievement } from './achievement';

export enum ProfileProperties {
    username = 'username',
    school = 'school',
    grade = 'grade',
    profilePictureUrl = 'profilePictureUrl',
    joinedDate = 'joinedDate',
    stats = 'stats',
    achievements = 'achievements',
}

export interface Profile extends BaseModel {
    [ProfileProperties.username]: string;
    [ProfileProperties.profilePictureUrl]: string;
    [ProfileProperties.school]: string;
    [ProfileProperties.grade]: string;
    [ProfileProperties.joinedDate]: Date;
    [ProfileProperties.stats]: ProfileStatistics;
    [ProfileProperties.achievements]: UserAchievement[];
}

export interface ProfileStatistics {
    maxDayStreak: number;
    totalXP: number;
    questionCompleted: number;
    avgScore: number;
}
