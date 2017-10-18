import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authentication/login', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                return this.updateStorage(response, username);
            });
    }

    logout(): void {
        this.token = '';
        localStorage.removeItem('currentUser');
    }

    refresh(username: string): Observable<boolean> {
        var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        var refreshToken = currentUser && currentUser.refreshToken;
        return this.http.post('/api/authentication/refresh',
            JSON.stringify({ username: username, refreshToken: refreshToken }))
            .map((response: Response) => {
                return this.updateStorage(response, username);
            });
    }

    register(username: string, email: string, password: string): Observable<boolean> {
        return this.http.post('/api/authentication/register',
                JSON.stringify({ username: username, email: email, password: password }))
            .map((response: Response) => {
                return (response.status === 200);
            });
    }

    private updateStorage(response: Response, username: string): boolean {
        let token = response.json() && response.json().token;
        if (token) {
            this.token = token;
            let refreshToken = response.json().refreshToken;
            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, refreshToken: refreshToken }));
            return true;
        } else {
            return false;
        }
    }
}

export class RegisterModel {
    givenName: string;
    surname: string;
    middleName: string;
    username: string;
    password: string;
    email: string;
}