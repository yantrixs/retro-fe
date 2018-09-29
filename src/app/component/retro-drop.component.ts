import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-drop-down',
    templateUrl: './drop-down.html',
    styleUrls: ['./drop-down.css']
})
export class RetroDropComponent implements OnInit {
    @Input() dropDownList;
    @Input() isOpen = false;
    @Output() updateOpenFlag = new EventEmitter();
    public canOpenDropDown = false;

    @HostListener('document:click', ['$event'])
    public clickOut(event): void {
        // console.log(event, '   srcElement  ', event.target.attributes.length);
        if (this.isOpen && event.target.attributes.length === 2) {
            this.canOpenDropDown = this.isOpen;
        } else if (this.isOpen && event.target.attributes.length > 2) {
            this.canOpenDropDown = false;
            this.updateOpenFlag.emit();
        }

        // this.isOpen = !this.isOpen;
        // this.isOpen = !this.eRef.nativeElement.contains(event.target);
    }

    @HostListener('click')
    clickInside() {
        // console.log(this.eRef.nativeElement.contains(event.target));
        this.canOpenDropDown = false;
    }

    ngOnInit(): void {
    }

    constructor(private eRef: ElementRef) {

    }

}
