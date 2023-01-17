import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {GraphQlClientModule} from "@miner/graph-ql-client";

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    GraphQlClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
