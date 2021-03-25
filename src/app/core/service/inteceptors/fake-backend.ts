﻿import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

let users = JSON.parse(localStorage.getItem("users")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/users/register") && method === "POST":
          return register();
        case url.endsWith("/products/add") && method === "POST":
          return addProduct();
          case url.endsWith("/products/edit") && method === "POST":
            return editProducts();
        case url.endsWith("/users") && method === "GET":
          return getUsers();
        case url.endsWith("/products") && method === "GET":
          return getProducts();
        case url.match(/\/users\/\d+$/) && method === "DELETE":
          return deleteUser();
        default:
          return next.handle(request);
      }
    }
    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error("Username or password is incorrect");
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: "fake-jwt-token",
      });
    }

    function register() {
      const user = body;

      if (users.find((x) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      return ok();
    }

    function addProduct() {
      const product = body;
      if (products.find((x) => x.name === product.name)) {
        return error('Продукт"' + product.name + '"уже существует');
      }

      product.id = products.length
        ? Math.max(...products.map((x) => x.id)) + 1
        : 1;
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));

      return ok();
    }

    function editProducts() {
      const product = body;
      const index  = products.findIndex((el)=>el.id === product.id)
      console.log(index);
      products.splice(index,1,product);
      localStorage.setItem("products", JSON.stringify(products));
      return ok();
    }

    function getProducts() {
      return ok(products);
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem("users", JSON.stringify(users));
      return ok();
    }
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};