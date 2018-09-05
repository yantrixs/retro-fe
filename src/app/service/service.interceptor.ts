import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {SpinnerService} from './spinner.service';
import {Observable} from 'rxjs';
import {AuthService} from 'ng2-ui-auth';
import {tap} from 'rxjs/operators';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Token is::  ', localStorage.getItem('thanvi-tech_token'));
        const headers = new HttpHeaders({
            'Authorization': `${this.authService.getToken()}`,
            'Content-Type': 'application/json'
        });

        this.spinnerService.display(true);
        const clonedRequest = req.clone({
            headers: headers
        });

        return next.handle(clonedRequest).pipe(tap((ev: HttpEvent<any>) => {
            setTimeout(() => {
                this.spinnerService.display(false);
            }, 1000);
            if (ev instanceof HttpResponse) {
                console.log('processing response', ev);
            }
            if (ev instanceof HttpErrorResponse) {
                console.log('Getting Error from service :: ', ev);
            }
        }));
    }
}
