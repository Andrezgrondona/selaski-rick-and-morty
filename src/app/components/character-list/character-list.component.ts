import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FilterPipe],
  templateUrl: './character-list.component.html',
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  loading = false;
  error = false;

  currentPage = 1;
  totalPages = 1;

  searchText = '';
  searchTerm$ = new Subject<string>();

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.fetchCharacters();

    this.searchTerm$.pipe(debounceTime(300)).subscribe((term: string) => {
      this.searchText = term;
    });
  }

  fetchCharacters(): void {
    this.loading = true;
    this.characterService.getCharacters(this.currentPage).subscribe({
      next: (response: any) => {
        this.characters.push(...response.results);
        this.filteredCharacters = this.characters;
        this.totalPages = response.info.pages;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  loadMore(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCharacters();

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 200);
    }
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term);
  }
}
