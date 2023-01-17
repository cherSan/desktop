import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PoolComponent } from './pool/pool.component';
import { LayoutComponent } from './layout/layout.component';
import { MinersComponent } from './miners/miners.component';
import {
  PoolEtcBlocksLoaderModule, PoolEtcFindersLoaderModule,
  PoolEtcMinersLoaderModule,
  PoolEtcPaymentsLoaderModule,
  PoolEtcStatsLoaderModule,
} from '@miner/graph-ql-client';
import { NzCardModule } from 'ng-zorro-antd/card';
import {
  DecimalPipe,
  NgForOf,
  NgIf,
  PercentPipe,
  TitleCasePipe,
} from '@angular/common';
import { ChartsModule } from '@miner/charts';
import { PoolInformationChartPipe } from './pool/pool-information-chart.pipe';
import { MomentDiffPipe } from '../../../../pipes/src/lib/moment-diff.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { SiSymbolPipe } from '@miner/pipes';
import { MomentPipe } from '../../../../pipes/src/lib/moment.pipe';
import { GridModule } from '@miner/grid';
import { BlocksComponent } from './blocks/blocks.component';
import { ChartPoolEtcBlocksOptionsPipe } from './blocks/chart-pool-etc-blocks-options.pipe';
import { PaymentsComponent } from './payments/payments.component';
import { FindersComponent } from './finders/finders.component';

@NgModule({
  declarations: [
    PoolInformationChartPipe,
    PoolComponent,
    LayoutComponent,
    MinersComponent,
    BlocksComponent,
    PaymentsComponent,
    FindersComponent,
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
            pathMatch: 'full',
          },
          {
            path: 'pool',
            component: PoolComponent,
          },
          {
            path: 'miners',
            component: MinersComponent,
          },
          {
            path: 'blocks',
            component: BlocksComponent,
          },
          {
            path: 'payments',
            component: PaymentsComponent,
          },
          {
            path: 'finders',
            component: FindersComponent,
          },
        ],
      },
    ]),
    NzTabsModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzStatisticModule,
    NzGridModule,
    PoolEtcStatsLoaderModule,
    NzCardModule,
    DecimalPipe,
    ChartsModule,
    MomentDiffPipe,
    PercentPipe,
    NzDividerModule,
    NzCollapseModule,
    NzDescriptionsModule,
    SiSymbolPipe,
    TitleCasePipe,
    NgIf,
    NgForOf,
    PoolEtcMinersLoaderModule,
    MomentPipe,
    GridModule,
    PoolEtcBlocksLoaderModule,
    ChartPoolEtcBlocksOptionsPipe,
    PoolEtcPaymentsLoaderModule,
    PoolEtcFindersLoaderModule,
  ],
})
export class EthereumClassicPoolModule {}
