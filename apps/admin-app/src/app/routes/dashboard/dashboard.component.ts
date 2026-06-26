import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  DashboardService,
  DashboardStats,
  RecentActivity,
  SubjectQuestionCount,
} from './dashboard.service';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'adm-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  statCards: StatCard[] = [];
  recentActivity: RecentActivity[] = [];
  questionsBySubject: SubjectQuestionCount[] = [];

  readonly activityColumns = ['user', 'action', 'date'];

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe((stats) => {
      this.statCards = this.toStatCards(stats);
    });
    this.dashboardService.getRecentActivity().subscribe((activity) => {
      this.recentActivity = activity;
    });
    this.dashboardService.getQuestionsBySubject().subscribe((list) => {
      this.questionsBySubject = list;
    });
  }

  private toStatCards(stats: DashboardStats): StatCard[] {
    return [
      { label: 'Total Users', value: stats.totalUsers, icon: 'people', colorClass: 'adm-stat-indigo' },
      { label: 'Total Questions', value: stats.totalQuestions, icon: 'quiz', colorClass: 'adm-stat-teal' },
      { label: 'Total Achievements', value: stats.totalAchievements, icon: 'emoji_events', colorClass: 'adm-stat-amber' },
      { label: 'Active Quests', value: stats.activeQuests, icon: 'flag', colorClass: 'adm-stat-rose' },
    ];
  }
}
