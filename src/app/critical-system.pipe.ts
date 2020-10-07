import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'criticalSystem'
})
export class CriticalSystemPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
