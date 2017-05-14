import { ModalOptions } from 'ng2-bootstrap/ng2-bootstrap';
import { ComponentData, DynamicModalComponent } from './dynamic-modal.component';
import { Injectable } from '@angular/core';

@Injectable()
export class DynamicModalService {
    private dynamicModalComponent: DynamicModalComponent;

    public initializeDynamicModal(dynModal: DynamicModalComponent) {
        this.dynamicModalComponent = dynModal;
    }

    public configureModal(config: ModalOptions) {
        this.dynamicModalComponent.dynamicModal.config = config;
    }

    public getModalSettings() {
        return this.dynamicModalComponent.getModalSettings();
    }

    public showModal(modal: ComponentData) {
        this.dynamicModalComponent.showModal(modal);
    }

    public hideModal() {
        this.dynamicModalComponent.hideModal();
    }

    public onShown(action: () => void) {
        this.dynamicModalComponent.onShown(action);
    }

    public onHidden(action: () => void) {
        let hidden = this.dynamicModalComponent.onHidden(action);
    }
}