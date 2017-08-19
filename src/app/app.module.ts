import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdRadioModule} from '@angular/material';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
