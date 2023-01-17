import {Component, EventEmitter, Output} from '@angular/core';
import {map} from 'rxjs';
import {ApolloAngularSDK} from '../../graph-ql.service';
import {ModelViewerComponent} from '../components';
import {PoolEtcMinersLoaderType} from './type';

@Component({
  selector: 'ldr-pool-etc-miners',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class PoolEtcMinersLoaderComponent extends ModelViewerComponent<PoolEtcMinersLoaderType> {
  @Output()
  public override change: EventEmitter<null | PoolEtcMinersLoaderType> =
    new EventEmitter<null | PoolEtcMinersLoaderType>();

  constructor(private gql: ApolloAngularSDK) {
    const query$ = gql
      .poolEtcMinersGet()
      .pipe(map((response) => response.data?.poolEtcMiners));
    const listener$ = gql
      .poolEtcMinersListen()
      .pipe(map((response) => response.data?.poolEtcMiners));
    super(query$, listener$);
  }
}
