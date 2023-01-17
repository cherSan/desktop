import { NgModule } from '@angular/core';
import {AgChartsAngularModule} from "ag-charts-angular";
import {ChartComponent} from "./chart/chart.component";

@NgModule({
  declarations:[
    ChartComponent
  ],
  exports: [
    ChartComponent
  ],
  imports: [
    AgChartsAngularModule
  ],
})
export class ChartsModule {}
