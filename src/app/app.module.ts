import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {AuthService, Ng2UiAuthModule} from 'ng2-ui-auth';
import {environment} from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/primeng';
import {HomeComponent} from './home/home.component';
import {CommonService} from './service/common.service';
import {SpinnerService} from './service/spinner.service';
import {ServiceInterceptor} from './service/service.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppCustomPreLoader} from './service/custom-preload.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        HomeComponent,
        PageNotFoundComponent,
    ],
    imports: [
        Ng2UiAuthModule.forRoot({
            baseUrl: environment.API_URL,
            tokenPrefix: 'retro-tech',
            loginUrl: '/auth/login',
            signupUrl: '/auth/signup'
        }),
        ReactiveFormsModule,
        BrowserModule,
        APP_ROUTES,
        MenubarModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        BrowserAnimationsModule
    ],
    providers: [AuthService, CommonService, SpinnerService, ServiceInterceptor, AppCustomPreLoader,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServiceInterceptor,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
