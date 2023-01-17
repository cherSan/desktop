import { NgModule } from '@angular/core';

import {RouterModule} from "@angular/router";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzGridModule} from "ng-zorro-antd/grid";
import {PoolComponent} from "./pool/pool.component";
import {LayoutComponent} from "./layout/layout.component";
import {MinersComponent} from "./miners/miners.component";

@NgModule({
  declarations: [
    PoolComponent,
    LayoutComponent,
    MinersComponent
  ],
  imports: [
    RouterModule.forChild([

      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'pool',
            pathMatch: 'full'
          },
          {
            path: 'pool',
            component: PoolComponent
          },
          {
            path: 'miners',
            component: MinersComponent
          }
        ]
      }
    ]),
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzStatisticModule,
    NzGridModule
  ]
})
export class EthereumClassicPoolModule {}
