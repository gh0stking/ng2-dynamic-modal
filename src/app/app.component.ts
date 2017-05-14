import { Component } from '@angular/core';

import { DynamicModalService } from '../components/dynamic-modal.service';
import { UserAddComponent } from './user-add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dynamicModalService: DynamicModalService) { }
  onDynamicModalLoaded(event): void {
    this.dynamicModalService.initializeDynamicModal(event);
  }

  showModal(): void {
    this.dynamicModalService.showModal({
      component: UserAddComponent
    });
  }

  ok(): void {
    console.log("clicked ok button.");
  }

  cancel(): void {
    console.log("clicked cancel button.");
  }
}
