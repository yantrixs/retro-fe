import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/components/common/menuitem';
import {AuthService} from 'ng2-ui-auth';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    items: MenuItem[];
    userItems: MenuItem[];
    public user;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getPayload();
        this.items = [
            {
                label: 'Agile Retro',
                badge: 'Agile'
            },
            {
                label: 'Boards',
                routerLink: 'boards',
                visible: this.authService.isAuthenticated()
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
                styleClass: 'user-nav-item'
            },
            {
                label: 'Log in',
                routerLink: 'auth'
            },
            {
                label: 'Profile',
                visible: false,
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

        this.userItems = [];
    }
}
