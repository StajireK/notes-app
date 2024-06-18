import { Pipe, PipeTransform } from '@angular/core';
import {TranslateService} from "./translate.service";

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: string): any {
    return this.translateService.translate(value);
  }

}
