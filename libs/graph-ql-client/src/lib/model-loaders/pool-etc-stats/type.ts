import {IPoolEtcStatsGetQuery, IPoolEtcStatsListenSubscription,} from '../../graph-ql.service';

export type PoolEtcStatsLoaderType =
  | IPoolEtcStatsGetQuery['poolEtcStats']
  | IPoolEtcStatsListenSubscription['poolEtcStats'];
