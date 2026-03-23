import { Injectable } from '@angular/core';
import { Profile } from '@libs/models';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    getUserProfile(): Observable<Profile> {
        return of({
            id: 'user123',
            username: 'code-ninja',
            profilePictureUrl:
                'https://i.pravatar.cc/150?u=a042581f4e29026704d',
            school: 'University of Code',
            grade: '12',
            joinedDate: new Date('2023-01-15T10:00:00Z'),
            stats: {
                maxDayStreak: 120,
                totalXP: 25480,
                questionCompleted: 1532,
                avgScore: 88.5,
            },
            achievements: [
                {
                    id: 'ach1',
                    name: 'Sage',
                    description: 'Earn 2000 XP in a single day',
                    iconUrl:
                        'https://d35aaqx5ub95lt.cloudfront.net/images/achievements/217492e7baf0961abdd2ddfb5881e7f9.svg',
                    currentLevel: 3,
                    maxLevel: 5,
                    currentProgress: 1500,
                    targetProgress: 2000,
                    isCompleted: false,
                },
                {
                    id: 'ach2',
                    name: 'Scholar',
                    description: 'Learn 100 new words or concepts',
                    iconUrl:
                        'https://d35aaqx5ub95lt.cloudfront.net/images/achievements/c2b4bc98d8229b08fd45e85087868c24.svg',
                    currentLevel: 5,
                    maxLevel: 5,
                    currentProgress: 100,
                    targetProgress: 100,
                    isCompleted: true,
                },
                {
                    id: 'ach3',
                    name: 'Wildfire',
                    description: 'Reach a 100-day streak',
                    iconUrl:
                        'https://d35aaqx5ub95lt.cloudfront.net/images/achievements/a7018d3f4a89422f851e65a983ac94a8.svg',
                    currentLevel: 1,
                    maxLevel: 1,
                    currentProgress: 0,
                    targetProgress: 100,
                    isCompleted: false,
                },
            ],
        } as Profile);
    }
}
