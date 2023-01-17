import { Pipe, PipeTransform } from '@angular/core';

type Exponent = -24 | -21 | -18 | -15 | -12 | -9 | -6 | -3 | 0 | 3 | 6 | 9 | 12 | 15 | 18 | 21 | 24;
interface Prefixes {
  [key: number]: string
}
const prefixes: Prefixes = {
  '24': 'Y',
  '21': 'Z',
  '18': 'E',
  '15': 'P',
  '12': 'T',
  '9': 'G',
  '6': 'M',
  '3': 'k',
  '0': '',
  '-9': 'n',
  '-12': 'p',
  '-15': 'f',
  '-18': 'a',
  '-21': 'z',
  '-24': 'y'
};
export function siSymbol(value?: number | string | null, suffix: string = '', fixed: number = 2): string {
  if (value === null || typeof value !== 'number' && typeof value !== 'string') {
    return 'N/A'
  }
  const num =  parseFloat(`${value}`);
  if (num === 0) {
    return '0.00' + suffix;
  }
  let sig = Math.abs(num);
  let exponent: Exponent = 0;

  while (sig >= 1000 && exponent < 24) {
    sig /= 1000;
    exponent += 3;
  }
  while (sig < .000001 && exponent > -24) {
    sig *= 1000;
    exponent -= 3;
  }
  const signPrefix = num < 0 ? '-' : '';
  if (sig > 1000) {
    return signPrefix + sig.toFixed(fixed) + (prefixes[exponent as keyof Prefixes]) + `${suffix}`;
  }
  return signPrefix + parseFloat(`${sig}`).toFixed(fixed) + (prefixes[exponent as keyof Prefixes] || '') + `${suffix}`;

}


@Pipe({
  standalone: true,
  name: 'siSymbol',
})
export class SiSymbolPipe implements PipeTransform {
  transform(value?: number | string | null, suffix: string = '', fixed: number = 2): string {
    return siSymbol(value, suffix, fixed)
  }
}

