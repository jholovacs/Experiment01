import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

    constructor(private readonly http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<IAuthenticationResponse>('/api/authentication/login',
                JSON.stringify({ username: username, password: password }))
            .subscribe(response => {
                    localStorage.setItem('username', response.username);
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('refreshToken', response.refreshToken);
                },
                error => console.log(error));
    }

    logout(): void {
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
    }

    refreshAuthToken() {
        const username = localStorage.getItem('username') || '';
        const refreshToken = localStorage.getItem('refreshToken') || '';
        return this.http.post<string>('api/authentication/refresh',
                { username: username, refreshToken: refreshToken })
            .subscribe(response => {
                    localStorage.setItem('authToken', response);
                },
                error => console.log(error));
    }

    register(username: string, email: string, password: string) {
        return this.http.post('/api/authentication/register',
            { username: username, email: email, password: password });
    }

}

export interface IAuthenticationResponse {
    username: string;
    token: string;
    refreshToken: string;
}