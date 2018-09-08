import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from 'primeng/components/common/menuitem';
import {AuthService} from 'ng2-ui-auth';
import {Subscription} from 'rxjs';
import {CommonService} from '../service/common.service';
import {UserPayload} from '../app.interface';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
    items: MenuItem[];
    private user: UserPayload;
    private userName = '';
    private isUserLoggedIn = false;
    private subscription: Subscription;

    constructor(private commonService: CommonService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.subscription = this.commonService.loggedUser.subscribe(val => {
            if (!val) {
                this.user = this.authService.getPayload();
                this.isUserLoggedIn = this.authService.isAuthenticated();
                this.userName = this.user ? this.user.username : '';
            } else {
                this.user = val;
                this.isUserLoggedIn = this.user !== null;
                this.userName = this.user ? this.user.username : '';
            }
            this.items = [];
            this.refreshItems();
            if (!this.isUserLoggedIn) {
                this.router.navigateByUrl('');
            }
        });

        this.items = [
            {
                label: 'Agile Retro',
                badge: 'Agile'
            },
            {
                label: 'Boards',
                routerLink: 'boards',
                visible: this.isUserLoggedIn
            },
            {
                label: 'Contact',
                routerLink: 'contact'
            },
            {
                label: 'About',
                routerLink: 'about'
            },
            {
                label: 'Sign Up',
                routerLink: 'auth/register',
                styleClass: 'user-nav-item',
                visible: !this.isUserLoggedIn
            },
            {
                label: 'Log in',
                routerLink: 'auth',
                visible: !this.isUserLoggedIn
            },
            {
                label: this.userName,
                visible: this.isUserLoggedIn,
                items: [
                    {
                        label: 'Change Password',
                        routerLink: 'passwordChange'

                    },
                    {
                        label: 'Profile',
                        routerLink: 'profile'
                    },
                    {
                        label: 'Logout',
                        routerLink: 'auth/logout'
                    }
                ]
            }
        ];
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private refreshItems() {
        this.items = [
            {
                label: 'Agile Retro',
                badge: 'Agile'
            },
            {
                label: 'Boards',
                routerLink: 'boards',
                visible: this.isUserLoggedIn
            },
            {
                label: 'Contact',
                routerLink: 'contact'
            },
            {
                label: 'About',
                routerLink: 'about'
            },
            {
                label: 'Sign Up',
                routerLink: 'auth/register',
                styleClass: 'user-nav-item',
                visible: !this.isUserLoggedIn
            },
            {
                label: 'Log in',
                routerLink: 'auth',
                visible: !this.isUserLoggedIn
            },
            {
                label: this.userName,
                visible: this.isUserLoggedIn,
                items: [
                    {
                        label: 'Change Password',
                        routerLink: 'passwordChange'

                    },
                    {
                        label: 'Profile',
                        routerLink: 'profile'
                    },
                    {
                        label: 'Logout',
                        routerLink: 'auth/logout'
                    }
                ]
            }
        ];
    }
}
