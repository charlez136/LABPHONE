import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appInsertionModalContent]',
})
export class InsertionModalContentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
