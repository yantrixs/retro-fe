import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserPayload} from '../app.interface';

Injectable();

export class CommonService {
    //     this.ss.setLogged(false);
    public loggedUser: BehaviorSubject<UserPayload> = new BehaviorSubject<UserPayload>(null);
    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    setLoggedUserInfo(value: UserPayload) {
        this.loggedUser.next(value);
    }

    public setLogged(val: boolean): void {
        //  console.log('value is :: ', val);
        this.subject.next(val);
    }

    public getLogged(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
