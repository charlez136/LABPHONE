import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, AuthenticationService } from "@service/authentification";

@Component({
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  _loginErr: boolean = false

  get loginErr(){
    return this._loginErr;
  }


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
      password: ["", [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this._loginErr = false;
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this._loginErr = true;
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
