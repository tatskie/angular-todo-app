import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
  this.loading = true;
  this.errors = false;
  this.authService.login(this.controls.email.value, this.controls.password.value)
    .subscribe((res: any) => {
      // Store the access token in the localstorage
      localStorage.setItem('access_token', res.access_token);
      this.loading = false;
      // Navigate to home page
      this.router.navigate(['/']);
    }, (err: any) => {
      // This error can be internal or invalid credentials
      // You need to customize this based on the error.status code
      this.loading = false;
      this.errors = true;
    });
  }

  logout(): void {
  this.loading = true;
  this.authService.logout()
    .subscribe(() => {
      this.loading = false;
      localStorage.removeItem('access_token');
      this.router.navigate(['/login']);
    });
  }

}
