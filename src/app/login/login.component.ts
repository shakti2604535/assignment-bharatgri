import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    localStorage.clear();
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (
      this.form?.valid &&
      this.form.value.username === 'bharatgri' &&
      this.form.value.password === '1234'
    ) {
      this.toastr.success('success');
      localStorage.setItem('name', this.form.value.username);
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('failed');
    }
  }
}
