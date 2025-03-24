import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotSubmitted]'
})
export class NotSubmittedDirective {

  constructor(el: ElementRef) { 
    el.nativeElement.style.backgroundColor = 'lightcoral';
    el.nativeElement.style.border = '1px solid red'; 
    el.nativeElement.style.color = 'yellow';

  }

}
