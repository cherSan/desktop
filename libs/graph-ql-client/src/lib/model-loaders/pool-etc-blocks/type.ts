import {IPoolEtcBlocksGetQuery, IPoolEtcBlocksListenSubscription,} from '../../graph-ql.service';

export type PoolEtcBlocksLoaderType =
  | IPoolEtcBlocksGetQuery['poolEtcBlocks']
  | IPoolEtcBlocksListenSubscription['poolEtcBlocks'];
