import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength',
  standalone: true
})
export class MaxLengthPipe implements PipeTransform {

  transform(str: string, length:number): unknown {

    if(str.length <length){
      return str
    }
    return str.slice(0,length) + '...'
  }

}
