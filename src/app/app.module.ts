import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Ng2BootstrapModule, ModalModule } from 'ng2-bootstrap';
import { DynamicModalComponent } from '../components/dynamic-modal.component';
import { DynamicModalService } from '../components/dynamic-modal.service';
import { UserAddComponent } from './user-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicModalComponent,
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    ModalModule.forRoot()
  ],
  entryComponents: [
    UserAddComponent,
  ],
  providers: [
    DynamicModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
