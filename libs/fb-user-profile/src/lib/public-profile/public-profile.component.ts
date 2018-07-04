import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'mono-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicProfileComponent implements OnInit {
  @Input() userProfile: any;

  constructor() {}

  ngOnInit() {}
}
