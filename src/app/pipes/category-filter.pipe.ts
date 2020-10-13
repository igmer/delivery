import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/models.model';
@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(category: Category[], texto: string): Category[] {
    if(texto.length === 0){
      return category;
    }
    texto = texto.toLocaleLowerCase();

    return category.filter(product => {
      return  product.name.toLocaleLowerCase().includes(texto);
    });
  }

}
