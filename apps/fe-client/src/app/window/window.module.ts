import {NgModule} from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {WindowComponent} from './window/window.component';
import {AsyncPipe, NgIf} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {ModalWindowComponent} from './modal-window/modal-window.component';
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzResizableModule} from "ng-zorro-antd/resizable";
import {HttpClientModule} from "@angular/common/http";
import {ApplicationManifest} from "@miner/applications";

let apps = 0;
export const window = (am: ApplicationManifest): Route => {
  apps++;
  const position = apps % 20 * 10;
  if (am.type === 'window') {
    return {
      path: am.type,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: `false/${position}/${position}/${am.width}/${am.height}/200`
        },
        {
          path: ':fullscreen/:x/:y/:width/:height/:zIndex',
          component: WindowComponent,
          loadChildren: am.application
        }
      ]
    }
  }
  return {
    path: am.type,
    component: ModalWindowComponent,
    loadChildren: am.application
  }
}

@NgModule({
  declarations: [
    WindowComponent,
    ModalWindowComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    AsyncPipe,
    NzCardModule,
    NgIf,
    CdkDrag,
    CdkDragHandle,
    NzIconModule,
    NzButtonModule,
    NzResizableModule,
  ]
})
export class WindowModule {
}
