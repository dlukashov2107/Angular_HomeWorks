import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  host: {
    '(document:keyup)': 'initKeyUp($event)',
  },
})
export class HighlightActiveDirective
  implements AfterViewInit, OnInit, OnChanges
{
  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Input() updateView: boolean = false;
  @Input() sort: (el1: HTMLElement, el2: HTMLElement) => number = null;
  @Output() onEnter = new EventEmitter<{ el: HTMLElement; index: number }>();

  private index: number = 0;
  private isLoaded: boolean = false;
  private items: HTMLElement[];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initItems();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  initItems(): void {
    this.items = this.el
      ? Array.from(
          (this.el.nativeElement as HTMLElement).querySelectorAll(
            this.selector,
          ),
        )
      : null;

    if (this.sort) {
      this.items.sort(this.sort);
    }
    if (this.initFirst && this.items?.length) {
      this.changeIndex(0);
    }
    // console.log('items', this.items);
  }

  changeIndex(shift: -1 | 1 | 0) {
    // console.log('changeIndex, params', shift);
    const items = this.items;
    if (!items.length) {
      return;
    }

    const index = items.findIndex((e: Element) =>
      e.classList.contains('active'),
    );

    this.index = index === -1 ? 0 : index;
    items[this.index].classList.remove('active');
    this.index += shift;

    if (this.index < 0) {
      this.index = items.length - 1;
    }
    if (this.index > items.length - 1) {
      this.index = 0;
    }

    items[this.index].classList.toggle('active');
    (items[this.index] as HTMLDivElement).scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

  initKeyUp(event: KeyboardEvent) {
    // console.log('event', event);
    if (event.key === 'ArrowRight') {
      this.changeIndex(1);
    } else if (event.key === 'ArrowLeft') {
      this.changeIndex(-1);
    } else if (event.key === 'Enter') {
      this.onEnter.emit({
        el: this.items[this.index],
        index: this.index,
      });
    }
  }
}
