import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  relativeTo: ActivatedRoute | null

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.relativeTo = activatedRoute;
  }
}
