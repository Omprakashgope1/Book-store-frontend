import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchThis: string): any {
    const val = searchThis.toLowerCase();
    if(val == "")return value
    let res = value.filter((res:any) => {
      return res.title.toLowerCase().includes(val)
    })
    return res
  }      
  

}
