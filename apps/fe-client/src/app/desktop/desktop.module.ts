import {NgModule} from '@angular/core';
import {Route, RouterModule, ROUTES} from "@angular/router";
import {DesktopComponent} from './desktop/desktop.component';
import {DockComponent} from "./dock/dock.component";
import {ApplicationsModule} from "../applications/applications.module";
import {ApplicationsService} from "../applications/applications.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {NzImageModule} from "ng-zorro-antd/image";
import {Application} from "../window/window.service";
import {window, WindowModule} from "../window/window.module";

function applicationsFactory(applicationsService: ApplicationsService): Route[] {
  return [
    {
      path: '',
      component: DesktopComponent,
      children: applicationsService.applications.map<Route>((application) => ({
        outlet: application.id,
        ...window(application),
        data: application,
        providers: [
          {
            provide: Application,
            useValue: application
          }
        ],
      }))
    }
  ];
}

@NgModule({
  declarations: [
    DesktopComponent,
    DockComponent,
    DockComponent
  ],
  imports: [
    ApplicationsModule,
    WindowModule,
    RouterModule.forChild([]),
    NgForOf,
    NzImageModule,
    AsyncPipe
  ],
  providers: [
    {
      provide: ROUTES,
      useFactory: applicationsFactory,
      multi: true,
      deps: [ApplicationsService]
    }
  ]
})
export class DesktopModule {
}
