import {IPoolEtcMinersGetQuery, IPoolEtcMinersListenSubscription,} from '../../graph-ql.service';

export type PoolEtcMinersLoaderType =
  | IPoolEtcMinersGetQuery['poolEtcMiners']
  | IPoolEtcMinersListenSubscription['poolEtcMiners'];
