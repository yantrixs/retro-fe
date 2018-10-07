import {Injectable} from '@angular/core';
import {BoardMember, CardInfo, Template, User, UserBoard} from '../app.interface';
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

    public saveMemberCard(cardInfo: CardInfo): Observable<CardInfo> {
        return this.httpClient.post<CardInfo>(`${environment.API_URL}/card`, cardInfo);
    }

    public getUserBoardCards(name: string): Observable<Array<CardInfo>> {
        return this.httpClient.get<Array<CardInfo>>(`${environment.API_URL}/cards/${name}`);
    }

    public getSharedUrl(name: string): Observable<string> {
        return this.httpClient.get<string>(`${environment.API_URL}/${name}/token`);
    }

    public addNewMemberToBoard(boardMember: BoardMember, boardName: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.API_URL}/${boardName}/manageMembers`, boardMember);
    }

    public getBoardMembers(name: string): Observable<Array<BoardMember>> {
        return this.httpClient.get<Array<BoardMember>>(`${environment.API_URL}/${name}/contactList`);
    }

    public removeBoardMember(name: string, id): Observable<any> {
        return this.httpClient.delete(`${environment.API_URL}/${name}/manageMembers/${id}`);
    }

    public sendMailToInActiveMember(member: BoardMember, name: string): Observable<any> {
        return this.httpClient.post<any>(`${environment.API_URL}/${name}/sendMailToInActiveMember`, member);
    }
}
