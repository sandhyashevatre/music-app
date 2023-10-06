import { Component } from '@angular/core';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent {
  categories: { name: string; image: string }[] = [
    { name: 'Bollywood', image: 'assets/images/bollywood.png' },
    { name: 'Hollywood', image: 'assets/images/hollywood.png' },
    { name: 'Tollywood', image: 'assets/images/tollywood.png' },
    { name: 'Marathi', image: 'assets/images/marathi.png' },
    { name: 'devo', image: 'assets/images/devo.png' },
    { name: 'Popular', image: 'assets/images/popular.png' }
  ];
}
