import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ColDef, RowClickedEvent} from "ag-grid-community";
import * as moment from "moment";
import {siSymbol} from "@miner/pipes";

@Component({
  selector: 'app-miners',
  templateUrl: './miners.component.html',
  styleUrls: ['./miners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinersComponent {
  public columnDefs: ColDef[] = [
    {
      maxWidth: 40,
      field: '',
      valueFormatter: () => '',
      cellClass: (node) => node.data.offline ? 'red-cell' : 'green-cell'
    },
    { field: 'id', minWidth: 300, headerName: '' },
    {
      minWidth: 120,
      maxWidth: 120,
      field: 'hr',
      headerName: 'Hashrate',
      valueFormatter: (node) => siSymbol(node.data.hr, 'H/s')
    },
    {
      minWidth: 70,
      maxWidth: 70,
      field: 'blocks',
      type: 'ChangeDetection',
      headerName: 'Blocks',
    },
    {
      minWidth: 180,
      field: 'lastBeat',
      headerName: 'Last Beat',
      valueFormatter: (node) => moment(node.data.lastBeat * 1000).fromNow()
    }
  ]
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  onRowClick($event: RowClickedEvent<any>) {
    return this.router.navigate([$event.data?.id], {relativeTo: this.activeRoute})
  }
}
