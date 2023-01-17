import { NgModule } from '@angular/core';
import {GridComponent} from "./grid/grid.component";
import {CoinRenderComponent} from "./coin-render/coin-render.component";
import {LinkRenderComponent} from "./link-render/link-render.component";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {AgGridModule} from "ag-grid-angular";
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  declarations: [
    GridComponent,
    CoinRenderComponent,
    LinkRenderComponent
  ],
  imports: [
    NzImageModule,
    NzStatisticModule,
    AgGridModule,
    NzButtonModule
  ],
  exports: [
    GridComponent,
    CoinRenderComponent,
    LinkRenderComponent
  ]
})
export class GridModule {}
