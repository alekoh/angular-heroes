/**
 * Created by aleksandar.mechkaros on 4/19/2017.
 */

import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[myHighlight]"
})

export class ColorDirective {
  constructor (private el: ElementRef) {}

  @Input("myHighlight") highlightColor: string;

  @HostListener("mouseenter") onMouseEnter() {
    this.highlight(this.highlightColor || "red");
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.highlight(null);
  }

  private highlight (color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
