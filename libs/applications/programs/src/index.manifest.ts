import {ApplicationManifest} from "@miner/applications";

export const programsManifest: ApplicationManifest = {
  id: 'programs',
  type: 'modal',
  name: 'Programs',
  application: () => import('./lib/programs.module').then(m => m.ProgramsModule),
  icon: '/assets/applications/programs.png',
  width: 600,
  height: 400
}
