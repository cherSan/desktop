import {
  IPoolEtcMinerGetQuery,
  IPoolEtcMinerGetQueryVariables,
  IPoolEtcMinerListenSubscription,
  IPoolEtcMinerListenSubscriptionVariables
} from "../../graph-ql.service";

export type PoolEtcMinerLoaderType =
  | IPoolEtcMinerGetQuery['poolEtcMiner']
  | IPoolEtcMinerListenSubscription['poolEtcMiner'];

export type PoolEtcMinerLoaderVariablesType =
  | IPoolEtcMinerGetQueryVariables
  | IPoolEtcMinerListenSubscriptionVariables;
