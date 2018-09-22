import {Injectable} from '@angular/core';
import {Template, User, UserBoard} from '../app.interface';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RetroService {
    constructor(private httpClient: HttpClient) {
    }

    public registerNewUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`${environment.API_URL}/auth/signup`, user);
    }

    public getUserInfo(token: string): Observable<User> {
        // console.log('token    =  ', `${environment.API_URL}/auth/register, ${token}`);
        const params = new HttpParams().set('token', token);
        return this.httpClient.get<User>(`${environment.API_URL}/auth/register`, {params: params});
    }

    public completeUserRegistration(user: User): Observable<User> {
        return this.httpClient.post<User>(`${environment.API_URL}/auth/register`, user);
    }

    public getBoardTemplates(): Observable<Array<Template>> {
        return this.httpClient.get<Array<Template>>(`${environment.API_URL}/templates`);
    }

    public saveUserBoard(board: UserBoard): Observable<any> {
        return this.httpClient.post<any>(`${environment.API_URL}/board`, board);
    }

    public getSavedUserBoards(): Observable<any> {
        return this.httpClient.get<any>(`${environment.API_URL}/boards`);
    }

    public getBoardDetails(name): Observable<any> {
        return this.httpClient.get<any>(`${environment.API_URL}/board/${name}`);
    }
}
