import {IPoolEtcPaymentsGetQuery, IPoolEtcPaymentsListenSubscription,} from '../../graph-ql.service';

export type PoolEtcPaymentsLoaderType =
  | IPoolEtcPaymentsGetQuery['poolEtcPayments']
  | IPoolEtcPaymentsListenSubscription['poolEtcPayments'];
