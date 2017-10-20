//import { Injectable } from '@angular/core';
//import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
//import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { AuthenticationService } 

//@Injectable()
//export class AuthenticatedHttpService implements HttpInterceptor {

//    intercept(request: HttpRequest<any>, next: HttpHandler) {
//        const authToken = localStorage.getItem('authToken') || '';
//        if (authToken === '' || request.url === '/api/auth/login' || request.url === '/api/auth/refresh') {
//            return (next.handle(request));
//        }
//        request = request.clone({
//            setHeaders: {
//                Authorization: `Bearer ${authToken}`
//            }
//        });
//        return next.handle(request);
//    }
//}
