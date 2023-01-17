import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ProgramsComponent} from "./programs/programs.component";

@NgModule({
  declarations: [
    ProgramsComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProgramsComponent
      }
    ])
  ]
})
export class ProgramsModule {
}
