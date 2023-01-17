import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ColDef, ICellRendererParams, RowClickedEvent} from "ag-grid-community";
import {LinkRenderComponent} from "@miner/grid";
import * as moment from "moment";
import {siSymbol} from "@miner/pipes";

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksComponent {
  dataLuckColDef: ColDef[] = [
    {
      field: 'block'
    },
    {
      field: 'luck',
      valueFormatter: (param) => (param.value * 100).toFixed(2).concat('%')
    },
    {
      field: 'uncleRate',
      valueFormatter: (param) => (param.value * 100).toFixed(2).concat('%')
    },
    {
      field: 'orphanRate',
      valueFormatter: (param) => (param.value * 100).toFixed(2).concat('%')
    }
  ]
  dataColDef: ColDef[] = [
    {
      field: 'height',
    },
    {
      field: 'login',
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        component: LinkRenderComponent,
      }),
      onCellClicked: this.onClick.bind(this)
    },
    {
      headerName: 'Time Found',
      field: 'timestamp',
      valueFormatter: (params) => moment(parseInt(params.value)).format('L LTS')
    },
    {
      field: 'reward',
      cellClass: (params) => params.data.uncle ? 'ag-grid-cell-uncle': 'ag-grid-cell-non-uncle'
    },
    {
      headerName: 'Type',
      field: 'uncle',
      valueFormatter: (params) => params.value ? 'Uncle' : 'Block',
      cellClass: (params) => params.data.uncle ? 'ag-grid-cell-uncle': 'ag-grid-cell-non-uncle'
    },
    {
      headerName: 'Shares/Diff',
      field: 'shareDiff',
      valueFormatter: (params) => siSymbol(params.value, 'H/s')
    },
    {
      field: 'worker',
    }
  ]
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onClick($event: RowClickedEvent<any>) {
    return this.router.navigate(['.', 'miners', $event.data.login], {relativeTo: this.activeRoute.parent})
  }
}
