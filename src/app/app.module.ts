import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdAutocompleteModule, MdInputModule, MdRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { AlbumDetailsComponent } from './album-details/album-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AlbumDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdRadioModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
