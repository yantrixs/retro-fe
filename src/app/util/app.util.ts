import {MessageService} from 'primeng/api';

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
}
