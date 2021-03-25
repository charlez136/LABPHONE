import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import {
  AlertService,
  UserService,
  AuthenticationService,
} from "@service/authentification";

@Component({
  templateUrl: "register.component.html",
  styleUrls: ["../login/login.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  _loginErr: boolean = false

  get loginErr(){
    return this._loginErr;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.maxLength(40),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.maxLength(40),
        ],
      ],
      username: [
        "",
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.pattern(
            '^(([^«»‹›‘’\'♦№<>(){}\\[\\]\\\\.,;:%$!#=?\\s\\/\\|+*&\\^@"\u0080-\u2009\u2011-\u2211\u2213-\uFFFF`]+(\\.[^«»‹›‘’\'♦№<>()\\[\\]\\\\.,;:%$!#=\\s\\/\\|+*&\\^@"\u0080-\u2010\u2011-\u2211\u2213-\uFFFF`]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
          ),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
    });
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._loginErr = false;
          this.alertService.success("Регистрация успешна", true);
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
          this._loginErr = true;
        }
      );
  }
}
