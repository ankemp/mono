import { Component, OnInit, Input } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

import { Observable } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
// import { MenuItem } from 'src/app/models';

@Component({
  selector: 'mono-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  @Input() menuItems: any[];
  private scrollEvent: Observable<CdkScrollable | void>;
  pageYOffset: Observable<number>;
  showNav = true;

  constructor(private dispatcher: ScrollDispatcher) {
    this.scrollEvent = this.dispatcher.scrolled();
  }

  ngOnInit() {
    this.pageYOffset = this.scrollEvent.pipe(map(_ => window.pageYOffset));
    this.pageYOffset.pipe(pairwise()).subscribe(([newYOffset, oldYOffset]) => {
      this.showNav = (newYOffset >= oldYOffset);
    });
  }

}
