import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAchievement } from '@libs/models';

@Component({
  selector: 'epa-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent {
  @Input() achievements: UserAchievement[] = [];

  /**
   * Calculates the progress percentage for the progress bar.
   * @param current The current progress value.
   * @param target The target progress value.
   * @returns The width percentage for the progress bar fill.
   */
  getProgressPercentage(current: number, target: number): number {
    if (target === 0) {
      return 0;
    }
    return (current / target) * 100;
  }
}
