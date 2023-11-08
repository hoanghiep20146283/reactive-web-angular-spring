import { Directive, HostBinding, Input } from "@angular/core";

@Directive({selector: '[appCustomDirectiveExamples]'})
export class CustomDirective {
    @HostBinding('class') customName = 'undefined';

    @Input() set appCustomDirectiveExamples(value) {
        this.customName = value;
    }
}