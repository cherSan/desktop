import {Inject, Injectable, InjectionToken} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DesktopService} from "../desktop/desktop.service";
import {ApplicationManifest} from "@miner/applications";

export const Application = new InjectionToken<ApplicationManifest>('Manifest');
type ChangePosition = {
  distanceX: number,
  distanceY: number,
  offsetWidth: number,
  offsetHeight: number
};
type Size = { width?: number, height?: number };
type Url = [boolean, number, number, number, number, number]
@Injectable()
export class WindowService {
  public readonly name: string;
  public readonly id: string;
  public readonly minWidth?: number;
  public readonly maxWidth?: number;
  public readonly minHeight?: number;
  public readonly maxHeight?: number;

  private readonly fullscreenValue$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly fullscreen$ = this.fullscreenValue$.asObservable();
  private readonly yValue$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly y$ = this.yValue$.asObservable();
  private readonly xValue$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public readonly x$ = this.xValue$.asObservable();
  private readonly widthValue$: BehaviorSubject<number> = new BehaviorSubject<number>(200);
  public readonly width$ = this.widthValue$.asObservable();
  private readonly heightValue$: BehaviorSubject<number> = new BehaviorSubject<number>(200);
  public readonly height$ = this.heightValue$.asObservable();
  private readonly zIndexValue$: BehaviorSubject<number> = new BehaviorSubject<number>(200);
  public readonly zIndex$ = this.zIndexValue$.asObservable();
  constructor(
    @Inject(Application) private application: ApplicationManifest,
    private desktopService: DesktopService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    if (application.type === 'window') {
      this.minWidth = application.minWidth;
      this.maxWidth = application.maxWidth;
      this.minHeight = application.minHeight;
      this.maxHeight = application.maxHeight;
    }
    this.id = application.id;
    this.name = application.name;
    activatedRoute.params
      .pipe(tap((params) => this.setParams(params)))
      .subscribe()
    this.setParams(activatedRoute.snapshot.params);
    this.desktopService.activateWindow(this.id, activatedRoute.snapshot.params['zIndex']);
    this.desktopService.change.pipe(tap(() => this.setZIndex())).subscribe();
    activatedRoute.firstChild!.url.subscribe(v => console.log(v));
  }

  private setParams(params: Params) {
    this.fullscreenValue$.next(params['fullscreen'] === 'true');
    this.heightValue$.next(parseInt(params['height']));
    this.widthValue$.next(parseInt(params['width']))
    this.yValue$.next(parseInt(params['y']))
    this.xValue$.next(parseInt(params['x']));
    this.zIndexValue$.next(parseInt(params['zIndex']));
  }

  move({
   distanceX,
   distanceY,
   offsetWidth,
   offsetHeight
  }: ChangePosition) {
    const x = this.xValue$.getValue() + distanceX;
    const y = this.yValue$.getValue() + distanceY;
    const rx = Math.max(Math.min(x, window.innerWidth - offsetWidth), 0)
    const ry = Math.max(Math.min(y, window.innerHeight - offsetHeight), 0)
    this.navigate([
      this.fullscreenValue$.getValue(),
      rx,
      ry,
      this.widthValue$.getValue(),
      this.heightValue$.getValue(),
      this.zIndexValue$.getValue()
    ])
  }

  setFullscreen(isFullscreen: boolean) {
    this.navigate([
      isFullscreen,
      this.xValue$.getValue(),
      this.yValue$.getValue(),
      this.widthValue$.getValue(),
      this.heightValue$.getValue(),
      this.zIndexValue$.getValue()
    ])
  }

  resize({ width, height }: Size) {
    this.navigate([
      this.fullscreenValue$.getValue(),
      this.xValue$.getValue(),
      this.yValue$.getValue(),
      width || this.minWidth || 400,
      height || this.minHeight || 300,
      this.zIndexValue$.getValue()
    ])
  }

  navigate(url: Url) {
    const currentSegments = this.router.parseUrl(this.router.url).root.children['primary'].children[this.id].segments;
    const newRoute = [
      ...url,
      ...currentSegments.slice(7).map(v => v.path)
    ];
    this.desktopService.navigate = this.desktopService.navigate.then(() => {
      return this.router.navigate(newRoute, {
        relativeTo: this.activatedRoute.parent,
        replaceUrl: true
      })
    })
  }

  close() {
    this.desktopService.close(this.application);
  }

  activate() {
    this.desktopService.activateWindow(this.id);
  }

  setZIndex() {
    console.log(this.id, this.desktopService.getIndex(this.id));
    this.navigate([
      this.fullscreenValue$.getValue(),
      this.xValue$.getValue(),
      this.yValue$.getValue(),
      this.widthValue$.getValue(),
      this.heightValue$.getValue(),
      this.desktopService.getIndex(this.id)
    ])
  }
}
