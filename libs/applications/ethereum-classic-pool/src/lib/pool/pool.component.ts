import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoolComponent {
  tracker(index: number, node: any) {
    return node.name
  }
}
