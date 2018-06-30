import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Banner } from '../../models';

@Component({
  selector: 'mono-banner-container',
  templateUrl: './banner-container.component.html',
  styleUrls: ['./banner-container.component.css']
})
export class BannerContainerComponent implements OnInit {
  banner$: Observable<Banner>;

  constructor() { }

  ngOnInit() {
  }

}
