import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
/**
 * Created by aleksandar.mechkaros on 4/28/2017.
 */
@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtml implements PipeTransform  {

  constructor(private _sanitizer: DomSanitizer){}

  transform(html: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
