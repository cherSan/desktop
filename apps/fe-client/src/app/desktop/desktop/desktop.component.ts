import {Component} from '@angular/core';
import {DesktopService} from "../desktop.service";
import {ApplicationsService} from "../../applications/applications.service";
import {ApplicationManifest} from "@miner/applications";

@Component({
  selector: 'cl-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss'],
  providers: [DesktopService]
})
export class DesktopComponent {
  applications: ApplicationManifest[]

  constructor(
    private desktopService: DesktopService,
    private applicationsService: ApplicationsService
  ) {
    this.applications = applicationsService.applications;
  }

  addApplication(application: ApplicationManifest) {
    this.desktopService.addWindow(application);
  }

  removeApplication(application: ApplicationManifest) {
    this.desktopService.removeWindow(application);
  }
}
