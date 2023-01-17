import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {DesktopService} from "../../desktop/desktop.service";
import {Application} from "../window.service";
import {ApplicationManifest} from "@miner/applications";
@Component({
  selector: 'cl-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
})
export class ModalWindowComponent {
  public data$: Observable<Data> = this.activatedRoute.data;
  constructor(
    @Inject(Application) private application: ApplicationManifest,
    private desktopService: DesktopService,
    private activatedRoute: ActivatedRoute
  ) {
  }
  close() {
    this.desktopService.close(this.application);
  }
  card($event: Event) {
    $event.stopPropagation();
  }
}
