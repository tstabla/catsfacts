import { Component, inject, OnInit, afterNextRender, Injector, ViewChildren, QueryList, DestroyRef } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { CatsService } from '../../services/cats/cats.service';
import { CatsFactComponent } from '../cats-fact/cats-fact.component';
import { distinctUntilChanged, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs';
import { ScrollToDirective } from '../../directives/scrollto.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CatsFactComponent,
    ScrollToDirective,
  ]
})
export class CatsComponent implements OnInit {
  private injector = inject(Injector);
  private catsService = inject(CatsService);
  private vc = inject(ViewportScroller);
  private destroyRef = inject(DestroyRef);
  @ViewChildren(ScrollToDirective) catsFacts!: QueryList<ScrollToDirective>;

  allFacts = this.catsService.factsCollection;

  ngOnInit(): void {
    this.getFact();

    afterNextRender(() => {
      fromEvent(window, 'scroll').pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(() => {
          const scrollPosition = this.vc.getScrollPosition()[1];
          const windowHeight = window.innerHeight;
          const documentHeight = document.body.offsetHeight;
          const diff = 20;

          if (scrollPosition + windowHeight > documentHeight - diff) {
            this.getFact();
          }
        })
    }, {injector: this.injector});
  }

  async getFact(): Promise<void> {
    const fact = await this.catsService.getFact();

    if(!fact) {
      this.catsFacts.last.scrollTo();
    }
  }

}
