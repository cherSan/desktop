import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicationManifest} from "@miner/applications";

type ActiveApplications = {
  [key: string]: ApplicationManifest & {}
}

@Injectable()
export class DesktopService {
  public navigate: Promise<boolean> = Promise.resolve(true);

  private windows: (string | undefined)[] = new Array(100);
  private activeApplicationsValue$: BehaviorSubject<ActiveApplications> = new BehaviorSubject<ActiveApplications>({});
  public activeApplications$ = this.activeApplicationsValue$.asObservable();

  public readonly change: Subject<void> = new Subject<void>();
  public readonly level: ActivatedRoute;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.level = activatedRoute.parent!;
  }
  activateWindow(id: string, zIndex: number = 200) {
    const currentIndex = this.windows.indexOf(id);
    if (currentIndex >= 0) {
      this.windows[currentIndex] = undefined;
    }
    const index = zIndex - 100;
    this.replaceArray(index, id);
    this.change.next();
  }

  getIndex(id: string) {
    const index = this.windows.indexOf(id);
    if (index === -1) return -1;
    return index + 100;
  }

  replaceArray(index: number, id: string): void {
    if(index === -1) return;
    const newId = this.windows[index];
    if(!newId) {
      this.windows[index] = id;
      return;
    }
    const newIndex = index - 1;
    this.windows[index] = id;
    this.replaceArray(newIndex, newId);
  }

  open(application: ApplicationManifest) {
    const currentIndex = this.windows.indexOf(application.id);
    if (currentIndex >= 0) {
      this.activateWindow(application.id)
    } else {
      this.navigate = this.navigate.then(() => {
        return this.router.navigate([
          {outlets: {[application.id]: application.type}}
        ], {replaceUrl: true, relativeTo: this.level});
      })
    }
  }

  close(application: ApplicationManifest) {
    const currentIndex = this.windows.indexOf(application.id);

    this.navigate = this.navigate.then(() => {
      return this.router.navigate([
        {outlets: { [application.id]: null }}
      ], {replaceUrl: true, relativeTo: this.level});
    }).then((r) => {
      if (currentIndex >= 0) {
        this.windows[currentIndex] = undefined;
      }
      return r;
    })
  }

  addWindow(application: ApplicationManifest) {
    const data = this.activeApplicationsValue$.getValue();
    data[application.id] = application;
    this.activeApplicationsValue$.next(data);
  }

  removeWindow(application: ApplicationManifest) {
    const data = this.activeApplicationsValue$.getValue();
    delete data[application.id]
    this.activeApplicationsValue$.next(data);
  }
}
