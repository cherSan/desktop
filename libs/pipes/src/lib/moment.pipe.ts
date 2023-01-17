import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  standalone: true,
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(value: number | string, format: string = 'L LTS'): string {
    const timestamp = parseFloat(`${value}`);
    return moment(timestamp).format(format);
  }
}
