import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register' , 
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService ,  private router: Router) {}
  
  ngOnInit(): void{
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
  if (this.registerForm.valid) {
    this.userService.registerUser(this.registerForm.value).subscribe(
      (response) => {
        alert('Registered successfully!');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registration failed. Try again');
        console.error('Error:', error);
        this.registerForm.reset();
      }
    );
  } else {
    alert('Form is invalid');
    this.registerForm.reset();
  }
}

}
