import {LoadChildren} from "@angular/router";
import {programsManifest} from "../../programs/src/index.manifest";
import {ethereumClassicManifest} from "../../ethereum-classic-pool/src/index.manifest";

interface ApplicationManifestWindow extends Manifest {
  type: 'window'
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
}

interface ApplicationManifestFloat extends Manifest {
  type: 'float'
}

interface ApplicationManifestModal extends Manifest {
  type: 'modal'
}

interface Manifest {
  id: string;
  application: LoadChildren;
  name: string;
  icon: string;
  width: number;
  height: number;
}

export type ApplicationManifest = ApplicationManifestWindow | ApplicationManifestFloat | ApplicationManifestModal;

export const applicationsManifests: ApplicationManifest[] = [
  programsManifest,
  ethereumClassicManifest,
]
