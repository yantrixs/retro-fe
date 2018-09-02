import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static matchPassword(ac: AbstractControl) {
       let password = ac.get('password').value; // to get value in input tag
       let confirmPassword = ac.get('confirmPassword').value; // to get value in input tag
        if(password !== confirmPassword) {
            ac.get('confirmPassword').setErrors( {matchPassword: true} )
        } else {
            return null
        }
    }
}