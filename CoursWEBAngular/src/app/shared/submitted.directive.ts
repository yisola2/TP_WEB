import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSubmitted]'
})
export class SubmittedDirective {

  constructor(el: ElementRef) { 
    el.nativeElement.style.backgroundColor = 'lightgreen';
    el.nativeElement.style.border = '1px solid green';
    el.nativeElement.style.padding = '10px';
    el.nativeElement.style.margin = '10px';
  }

}
