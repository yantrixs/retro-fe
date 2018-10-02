import {MessageService} from 'primeng/api';
import {EmailValidation} from '../app.interface';

export class Util {
    public static isObjectEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    public static showToastMessage(target: string, ms: MessageService, error: string = null): void {
        if (target === 'serviceSuccess') {
            ms.add({key: target, severity: 'success', summary: 'Success'});
        } else {
            ms.add({key: target, severity: 'fail', summary: 'Service Fail', detail: error});
        }
    }

    public static isValidEmails(email: string): EmailValidation {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validation = {} as EmailValidation;
        const emails = email.split(/[ ,;]+/);
        for (let i = 0; i < emails.length; i++) {
            if (emails[i] === '' || !regex.test(emails[i])) {
                validation.invalidStr = emails[i];
                validation.isValid = false;
                return validation;
            }
        }
        validation.isValid = true;
        validation.invalidStr = '';
        return validation;
    }
}
