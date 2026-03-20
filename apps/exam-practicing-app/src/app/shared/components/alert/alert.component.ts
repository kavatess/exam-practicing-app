import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, AlertConfig } from './alert.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'epa-alert',
  standalone: true,
  imports: [CommonModule, NgbAlertModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  currentAlert: AlertConfig | null = null;
  private alertSubscription!: Subscription;
  private timerSubscription!: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alertMessage$.subscribe(config => {
      this.currentAlert = config;
      console.log(config)
      this.startCloseTimer(config.duration || 3000);
    });
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  closeAlert(): void {
    this.currentAlert = null;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private startCloseTimer(duration: number): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(duration).subscribe(() => {
      this.closeAlert();
    });
  }
}
