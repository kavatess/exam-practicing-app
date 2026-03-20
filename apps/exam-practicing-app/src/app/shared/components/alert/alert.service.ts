import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface AlertConfig {
  message: string;
  type: 'success' | 'danger';
  duration?: number; // in milliseconds, default to 3000
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _messageSubject = new Subject<AlertConfig>();
  public alertMessage$: Observable<AlertConfig> = this._messageSubject.asObservable();

  /**
   * Displays an alert message.
   * @param message The message to display.
   * @param type The type of alert ('success' or 'danger').
   * @param duration The duration in milliseconds before the alert closes (default: 3000).
   */
  showAlert(message: string, type: 'success' | 'danger', duration = 3000): void {
    this._messageSubject.next({ message, type, duration });
  }
}
