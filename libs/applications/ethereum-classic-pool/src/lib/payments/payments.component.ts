import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ColDef, ICellRendererParams, RowClickedEvent} from "ag-grid-community";
import {ActivatedRoute, Router} from "@angular/router";
import {LinkRenderComponent} from "@miner/grid";
import * as moment from "moment";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
  public columnDef: ColDef[] = [
    {
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: (params) => moment(params.value).format('L LTS'),
      minWidth: 160,
      maxWidth: 160,
    },
    {
      field: 'amount',
      minWidth: 120,
      maxWidth: 120,
      type: 'CoinAmount',
    },
    {
      field: 'address',
      cellRendererSelector:  (_: ICellRendererParams) =>  ({
        component: LinkRenderComponent,
      }),
      onCellClicked: this.onClick.bind(this)
    },
    {
      headerName: 'Tx ID',
      field: 'tx'
    }
  ]
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onClick($event: RowClickedEvent<any>) {
    return this.router.navigate(['.', 'miners', $event.data?.address], {relativeTo: this.activeRoute.parent})
  }
}
