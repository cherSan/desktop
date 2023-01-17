import {IPoolEtcFindersGetQuery, IPoolEtcFindersListenSubscription,} from '../../graph-ql.service';

export type PoolEtcFindersLoaderType =
  | IPoolEtcFindersGetQuery['poolEtcFinders']
  | IPoolEtcFindersListenSubscription['poolEtcFinders'];
