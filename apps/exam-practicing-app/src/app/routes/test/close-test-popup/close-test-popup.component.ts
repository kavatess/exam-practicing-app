import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../../../app.routes';

@Component({
  selector: 'epa-close-test-popup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './close-test-popup.component.html',
  styleUrls: ['./close-test-popup.component.scss'],
})
export class CloseTestPopupComponent {
  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  closeTest() {
    this.activeModal.close('close');
    this.router.navigate([APP_ROUTES.DASHBOARD]);
  }

  dismiss() {
    this.activeModal.dismiss('cancel');
  }
}
