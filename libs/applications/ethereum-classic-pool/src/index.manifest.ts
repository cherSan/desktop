import {ApplicationManifest} from "@miner/applications";

export const ethereumClassicManifest: ApplicationManifest = {
  id: 'etc',
  type: 'window',
  name: 'Ethereum Classic',
  application: () => import('./lib/ethereum-classic-pool.module').then(m => m.EthereumClassicPoolModule),
  icon: '/assets/applications/etc.svg',
  width: 600,
  height: 400,
  minWidth: 400,
  minHeight: 300,
}
