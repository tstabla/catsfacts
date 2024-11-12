import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsService } from '../../services/cats/cats.service';
import { ICatsFact } from '../../models/cats.api.interface';

@Component({
  selector: 'app-cats-fact',
  templateUrl: './cats-fact.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class CatsFactComponent {
  public catsService = inject(CatsService);

  @Input({required: true}) fact!: string;
} 