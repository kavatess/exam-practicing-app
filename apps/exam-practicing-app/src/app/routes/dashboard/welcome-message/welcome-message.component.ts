import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'epa-welcome-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './welcome-message.component.html',
    styleUrl: './welcome-message.component.scss',
})
export class WelcomeMessageComponent {}
