import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DashboardStats {
  totalUsers: number;
  totalQuestions: number;
  totalAchievements: number;
  activeQuests: number;
}

export interface RecentActivity {
  user: string;
  action: string;
  date: string;
}

export interface SubjectQuestionCount {
  subject: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  getStats(): Observable<DashboardStats> {
    return of({
      totalUsers: 1284,
      totalQuestions: 5302,
      totalAchievements: 48,
      activeQuests: 12,
    });
  }

  getRecentActivity(): Observable<RecentActivity[]> {
    return of([
      { user: 'Nguyen Van A', action: 'Completed a practice test', date: '2026-06-25' },
      { user: 'Tran Thi B', action: 'Earned achievement "Streak Master"', date: '2026-06-25' },
      { user: 'Le Van C', action: 'Joined quest "Weekly Challenge"', date: '2026-06-24' },
      { user: 'Pham Thi D', action: 'Purchased shop item "Avatar Frame"', date: '2026-06-24' },
      { user: 'Hoang Van E', action: 'Created an account', date: '2026-06-23' },
    ]);
  }

  getQuestionsBySubject(): Observable<SubjectQuestionCount[]> {
    return of([
      { subject: 'Mathematics', count: 1520 },
      { subject: 'Physics', count: 980 },
      { subject: 'Chemistry', count: 870 },
      { subject: 'English', count: 1432 },
      { subject: 'History', count: 500 },
    ]);
  }
}
