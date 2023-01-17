import {Component, EventEmitter, Input, Output} from "@angular/core";
import {map} from "rxjs";
import {ApolloAngularSDK} from "../../graph-ql.service";
import {PoolEtcMinerLoaderType, PoolEtcMinerLoaderVariablesType} from './type';
import {ModelViewerVariablesComponent} from "../variables-component";

@Component({
  selector: 'ldr-pool-etc-miner',
  templateUrl: '../components.html',
  styleUrls: ['../components.scss'],
})
export class PoolEtcMinerLoaderComponent extends ModelViewerVariablesComponent<PoolEtcMinerLoaderType, PoolEtcMinerLoaderVariablesType> {
  @Output()
  public override change: EventEmitter<null | PoolEtcMinerLoaderType> =
    new EventEmitter<null | PoolEtcMinerLoaderType>();

  constructor(private gql: ApolloAngularSDK) {
    const query$ = (variables: PoolEtcMinerLoaderVariablesType) => gql
      .poolEtcMinerGet(variables)
      .pipe(map((response) => response.data?.poolEtcMiner));
    const listener$ = (variables: PoolEtcMinerLoaderVariablesType) => gql
      .poolEtcMinerListen(variables)
      .pipe(map((response) => response.data?.poolEtcMiner));
    super(query$, listener$);
  }

  @Input('variables')
  set variables(variables: PoolEtcMinerLoaderVariablesType) {
    this.variables$.next(variables);
  }
}
