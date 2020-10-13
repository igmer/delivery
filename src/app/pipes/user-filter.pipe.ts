import { Pipe, PipeTransform } from '@angular/core';
import { User } from "../models/models.model";

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], texto: string): User[] {
    if(texto.length === 0){
      return users;
    }
    texto = texto.toLocaleLowerCase();

    return users.filter(users => {
      return users.name.toLocaleLowerCase().includes(texto);
    });
  }
}
