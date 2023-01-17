import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DesktopService} from "../desktop.service";
import {ApplicationManifest} from "@miner/applications";

type ApplicationDock = ApplicationManifest & {
  routerLink: any[];
  relativeTo: ActivatedRoute | null
}

@Component({
  selector: 'cl-dock',
  templateUrl: './dock.component.html',
  styleUrls: ['./dock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockComponent {
  public applications: ApplicationDock[] = [];
  public readonly activeApplications$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private desktop: DesktopService
  ) {
    this.activeApplications$ = desktop.activeApplications$;
  }

  @Input('applications')
  set app(applications: ApplicationManifest[]) {
    this.applications = applications.map(app => ({
      ...app,
      routerLink: [{outlets: {[app.id]: app.type}}],
      relativeTo: this.desktop.level
    }))
  }

  openApplication(application: ApplicationDock) {
    this.desktop.open(application);
  }
}
