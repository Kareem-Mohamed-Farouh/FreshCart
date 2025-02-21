import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../../interfaces/IProducts/iproducts';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: IProducts[], searchWord: string): IProducts[] {
    return products.filter((prod) =>
      prod.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
    );
  }
}
