import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) 
        return;

   this.userService.loginUser(this.loginForm.value).subscribe(
    (response) => {
    if (response && response.acesstoken) 
    {
      sessionStorage.setItem('acesstoken', response.acesstoken);
      localStorage.setItem('userEmail', this.loginForm.value.email);

      alert("Login Successful");

      this.router.navigate(['/upload']);
    } 

    else {
      alert('Invalid response from server');
    }
  },
  (error) => {
    alert('Invalid email or password');
    this.loginForm.reset();
  }
);

  }
}
