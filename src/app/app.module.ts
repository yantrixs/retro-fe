import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {AuthService, Ng2UiAuthModule} from 'ng2-ui-auth';
import {environment} from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/primeng';
import {HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        HomeComponent
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
        InputTextModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
