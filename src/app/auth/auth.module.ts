import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LoginComponent, RegisterComponent } from "./components";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    RouterModule.forChild([
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ]),
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}
