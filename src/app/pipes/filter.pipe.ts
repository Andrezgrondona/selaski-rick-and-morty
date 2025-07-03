
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(characters: any[], searchText: string): any[] {
    if (!characters || !searchText) {
      return characters;
    }

    const lowerText = searchText.toLowerCase();
    return characters.filter(character =>
      character.name.toLowerCase().includes(lowerText) ||
      character.species.toLowerCase().includes(lowerText) ||
      character.status.toLowerCase().includes(lowerText)
    );
  }
}



/* 

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;

    const lowerSearch = searchText.toLowerCase();

    return items.filter(item =>
      item.name.toLowerCase().includes(lowerSearch) ||
      item.species.toLowerCase().includes(lowerSearch) ||
      item.status.toLowerCase().includes(lowerSearch)
    );
  }
}

*/