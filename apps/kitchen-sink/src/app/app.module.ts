import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxModule } from '@nrwl/nx';
import { AngularFireModule } from 'angularfire2';
import { FbAuthModule } from '@mono/fb-auth';
import { TopNavModule } from '@mono/top-nav';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    FbAuthModule.config(environment.auth),
    TopNavModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
