import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragEnd} from "@angular/cdk/drag-drop";
import {Subject} from "rxjs";
import {NzResizeEvent} from "ng-zorro-antd/resizable/resizable.directive";
import {animate, style, transition, trigger} from "@angular/animations";
import {DesktopService} from "../../desktop/desktop.service";
import {WindowService} from "../window.service";
@Component({
  selector: 'cl-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ WindowService ],
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
export class WindowComponent {
  private animationFrameId: number = -1;
  hide = false;

  fullscreen$ = this.windowService.fullscreen$;
  y$ = this.windowService.y$;
  x$ = this.windowService.x$;
  width$ = this.windowService.width$;
  height$ = this.windowService.height$;
  zIndex$ = this.windowService.zIndex$;

  name = this.windowService.name;
  minHeight = this.windowService.minHeight;
  maxHeight = this.windowService.maxHeight;
  minWidth = this.windowService.minWidth;
  maxWidth = this.windowService.maxWidth;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private zIndexService: DesktopService,
    private windowService: WindowService
  ) {
  }

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(() => {
      this.windowService.resize({
        width,
        height
      })
    });
  }
  onDragEnd($event: CdkDragEnd) {
    this.windowService.move({
      distanceX: $event.distance.x,
      distanceY: $event.distance.y,
      offsetWidth: $event.source.element.nativeElement.offsetWidth,
      offsetHeight: $event.source.element.nativeElement.offsetHeight
    })
  }
  setFullscreen(isFs: boolean) {
    this.windowService.setFullscreen(isFs);
  }
  activate() {
    this.windowService.activate();
  }
  close() {
    this.windowService.close()
  }

  hideWindow(isHide: boolean) {
    this.hide = isHide;
  }
}
