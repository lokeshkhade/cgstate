import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive ({
 selector: '[landarea]'
})
export class LandAreaDirective {
 // Allow decimal numbers and negative values
 private regex: RegExp = new RegExp(/^[0-9]{0,3}(?:[.]\d{0,3})?$/);
 private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home','Delete', 'ArrowLeft', 'ArrowRight', 'Left', 'Right'];

constructor(private el: ElementRef) {
 }
 @HostListener('keydown', [ '$event' ])
 onKeyDown(event: KeyboardEvent) {
 // Allow Backspace, tab, end, and home keys
 if (this.specialKeys.indexOf(event.key) !== -1) {
 return;
 }
 let current: string = this.el.nativeElement.value;
 let next: string = current.concat(event.key);
 if (next && !String(next).match(this.regex)) {
 event.preventDefault();
 }
 }
}