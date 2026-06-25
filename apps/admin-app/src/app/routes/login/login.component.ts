import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ADMIN_APP_ROUTES } from '../../app.routes'; // For the eye icon

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    passwordVisible = false; // To toggle password visibility

    constructor(
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate([ADMIN_APP_ROUTES.DASHBOARD]);
        }
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            // Simulate login
            this.authService.login().subscribe((success) => {
                if (success) {
                    console.log(
                        'Login successful for:',
                        this.loginForm.value.username
                    );
                    this.router.navigate(['/dashboard']);
                } else {
                    // Handle login failure (e.g., show error message)
                    console.error('Login failed');
                }
            });
        } else {
            // Mark all fields as touched to display validation errors
            this.loginForm.markAllAsTouched();
        }
    }

    togglePasswordVisibility(): void {
        this.passwordVisible = !this.passwordVisible;
    }
}
