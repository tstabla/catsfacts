import { Directive, inject, AfterViewInit, ElementRef, afterNextRender, Injector } from "@angular/core";


@Directive({
  selector: '[appScrollTo]',
  standalone: true
})
export class ScrollToDirective implements AfterViewInit {
    private elementRef = inject(ElementRef);
    private injector = inject(Injector);

    ngAfterViewInit(): void {
       afterNextRender(() => {
        this.scrollTo();
       }, {injector: this.injector});
    }

    scrollTo(): void {
        const element = this.elementRef.nativeElement;
        const offsetHeight = element.offsetHeight;
        const offsetTop = element.offsetTop;
        const windowHeight = window.innerHeight;
        const diff = 50;

        window.scrollTo({ behavior: 'smooth', top: offsetTop+offsetHeight-windowHeight+diff }); 
    }
}
