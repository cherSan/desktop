import { Injectable } from '@angular/core';
import {ApplicationManifest, applicationsManifests} from "@miner/applications";

@Injectable()
export class ApplicationsService {
  public readonly applications: ApplicationManifest[] = applicationsManifests;
  private readonly applicationsMap: Map<string, ApplicationManifest> = new Map<string, ApplicationManifest>()
  constructor() {
    this.applications.forEach(application => {
      this.applicationsMap.set(application.id, application);
    })
  }

  getApplicationById(applicationId: string): ApplicationManifest | undefined {
    return this.applicationsMap.get(applicationId);
  }
}
