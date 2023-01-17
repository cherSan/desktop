import { Pipe, PipeTransform } from '@angular/core';
import { AgChartOptions, time } from "ag-charts-community";
import {
  AgCartesianSeriesTooltipRendererParams,
  AgTooltipRendererResult
} from "ag-charts-community/dist/cjs/es5/chart/agChartOptions";
import * as moment from "moment";
import {siSymbol} from "@miner/pipes";
import {PoolEtcStatsLoaderType} from "@miner/graph-ql-client";

@Pipe({
  name: 'poolInformationChart'
})
export class PoolInformationChartPipe implements PipeTransform {
  renderer(params: AgCartesianSeriesTooltipRendererParams): string | AgTooltipRendererResult {
    return {
      title: params.title,
      content: `
        <div>
          <div>${moment(params.xValue).format('L LTS')}</div>
          <div>${siSymbol(params.yValue, 'H/s')}</div>
        </div>
      `
    }
  }
  transform(data: PoolEtcStatsLoaderType): AgChartOptions {
    if (!data) return {};
    return {
      title: {
        enabled: false
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      series: [
        {
          xKey: 'x',
          yKey: 'y',
          xName: 'Date-Time',
          yName: 'Network Difficulty',
          data: data.netCharts,
          tooltip: {
            renderer: this.renderer
          }
        },
        {
          xKey: 'x',
          yKey: 'y',
          xName: 'Date-Time',
          yName: 'Pool Hashrate',
          data: data.poolCharts,
          tooltip: {
            renderer: this.renderer
          }
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['y'],
          title: {
            enabled: false,
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H/s');
            }
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['x'],
          title: {
            enabled: false,
          },
          label: {
            autoRotate: true
          },
          tick: {
            count: time.hour.every(1)
          }
        }
      ]
    };
  }

}
