import { Subscription } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector, EventEmitter, Output, Input } from '@angular/core';

export class ComponentData {
    public component: any;
    public inputs?: any;
    public settings?: any;
}

@Component({
    selector: 'dynamic-modal',
    entryComponents: [],
    template: `
        <div bsModal #dynamicModal="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left">{{title||"标题"}}</h4>
                        <button type="button" class="close pull-right" aria-label="Close" (click)="dynamicModal.hide()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div #dynamicModalContainer></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" (click)="onOkEvent()">{{okText||'确　定'}}</button>
                        <button type="button" class="btn btn-primary" (click)="onCancelEvent()">{{cancelText||'取　消'}}</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-header{
            background-color:#2D3446;
            border-top-left-radius:3px;
            border-top-right-radius:3px;
            color:white;
        }
    `]
})
export class DynamicModalComponent implements OnInit {
    @Input("title") title: string;
    @Input("okText") okText: string;
    @Input("cancelText") cancelText: string;
    @Output("dynamicModalComponent") dynamicModalComponent = new EventEmitter<DynamicModalComponent>();
    @Output("onOk") onOk: EventEmitter<any> = new EventEmitter<any>();
    @Output("onCancel") onCancel: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('dynamicModal') dynamicModal: ModalDirective;
    @ViewChild('dynamicModalContainer', { read: ViewContainerRef }) dynamicModalContainer: ViewContainerRef;

    private modalSubscriptions: Subscription[] = [];
    private modalSettings: any;

    constructor(private resolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.dynamicModalComponent.emit(this);
    }

    public showModal(modal: ComponentData) {
        modal.inputs = modal.inputs || {};
        this.modalSettings = modal.settings;
        let inputProviders = Object.keys(modal.inputs).map((inputName) => { return { provide: inputName, useValue: modal.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicModalContainer.parentInjector);
        let factory = this.resolver.resolveComponentFactory(modal.component);
        let componentCreated = factory.create(injector);
        this.dynamicModalContainer.clear();
        this.dynamicModalContainer.insert(componentCreated.hostView);

        this.dynamicModal.show();
    }

    public hideModal() {
        this.dynamicModal.hide();
    }

    public onShown(action: () => void) {
        this.modalSubscriptions.push(this.dynamicModal.onShown.subscribe(action));
    }

    public onHidden(action: () => void) {
        this.modalSubscriptions.push(this.dynamicModal.onHidden.subscribe(() => {
            action();
            this.clearSubscriptions();
        }));
    }

    public getModalSettings() {
        return this.modalSettings;
    }

    private clearSubscriptions() {
        this.modalSubscriptions.map(sub => { sub.unsubscribe(); });
        this.modalSubscriptions = [];
    }

    private onOkEvent(): void {
        this.hideModal();
        this.onOk.emit(true);
    }

    private onCancelEvent(): void {
        this.hideModal();
        this.onCancel.emit(false);
    }

}