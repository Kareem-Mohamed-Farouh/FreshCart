import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangerheart]',
})
export class ChangerheartDirective {
  constructor(private readonly el: ElementRef) {}
  @HostListener('click') onclick() {
    let myel = this.el.nativeElement as HTMLElement;
    // myel.classList.add('');
    myel.classList.toggle('fa-solid');
    // myel.classList.remove('fa-regular');
  }

  // @HostListener('dblclick') ondblclick() {
  //   let myel = this.el.nativeElement as HTMLElement;
  //   // myel.classList.add('');
  //   myel.classList.remove('fa-solid');
  //   myel.classList.add('fa-regular');
  // }
}
