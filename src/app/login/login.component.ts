import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {
    console.log('login page started...');
  }

  url = 'http://localhost:8080/login/get/user';

  ngOnInit() {
  }

  onSignUp(): void {
    this.router.navigate(['/signup']).then(r => console.log('navigated to sign up page'));
  }

  onSubmit(loginForm: NgForm): void {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.http.post<any>(this.url, {username, password}).subscribe(response => {
        console.log(response);

        if (response === 'SUCCESS') {
          this.router.navigate(['/home']).then(r => console.log('successfully logged into the home'));
        } else if (response === 'WRONG_USERNAME') {
          loginForm.form.controls['username'].reset();
          this.errorMessage = 'Invalid Username';
        } else if (response === 'WRONG_PASSWORD') {
          loginForm.form.controls['password'].reset();
          this.errorMessage = 'Invalid Password';
        } else {
          loginForm.reset();
        }
      },
      error => {
        this.errorMessage = 'login failed';
        loginForm.reset();
      });
  }
}
