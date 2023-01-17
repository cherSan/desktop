import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicationManifest} from "@miner/applications";
import {DesktopService} from "../../desktop/desktop.service";

type ApplicationDock = ApplicationManifest & {
  routerLink: any[]
}
@Component({
  selector: 'cl-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss']
})
export class DockComponent {
  applications: ApplicationDock[] = [];
  @Input('applications')
  set app(applications: ApplicationManifest[]) {
    this.applications = applications.map(app => ({
      ...app,
      routerLink: [{ outlets: { [app.id]: app.type } }],
    }))
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private desktopService: DesktopService
  ) {
  }
  open(application: ApplicationDock) {
    const isActive = this.activatedRoute.children.some(ar => ar.outlet === application.id)
    console.log(this.router.config);
    if (isActive) {
      this.router.navigate(
        [{outlets: { [application.id]: application.type }}],
        { relativeTo: this.activatedRoute, replaceUrl: true }
      )
    } else {
      this.desktopService.activateWindow(application.id);
    }
  }
}
