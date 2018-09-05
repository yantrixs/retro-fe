import {Component, OnInit} from '@angular/core';
import {AuthService} from 'ng2-ui-auth';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router, private commonService: CommonService) {
    }

    ngOnInit() {
        this.authService.logout()
            .subscribe({
                error: (err: any) => console.log(err),
                complete: () => {
                    this.commonService.setLoggedUserInfo(null);
                    // this.authService
                    this.router.navigate(['']);
                }
            });
    }

}
