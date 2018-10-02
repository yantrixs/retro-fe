import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit, OnInit {

    constructor(private el: ElementRef) {
    }

    public ngOnInit(): void {
        this.el.nativeElement.focus();
    }

    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }

}
