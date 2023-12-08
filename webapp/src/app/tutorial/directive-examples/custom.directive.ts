import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({ selector: '[appCustomDirectiveExamples]' })
export class CustomDirective {
    @HostBinding('class') customName = 'undefined';
    @HostBinding('class.is-hovering') isHovering = false;
    @HostListener('mouseenter') onMouseEnter() {
        this.isHovering = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isHovering = false;
    }

    @Input() set appCustomDirectiveExamples(value) {
        this.customName = value + "-CustomDirectiveValue";
    }
}