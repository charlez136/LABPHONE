import {
    ApplicationRef,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ModalComponent, ToastComponent } from '../../../modal/components';
import { DialogText } from '../../../modal/models';

import { custom } from 'devextreme/ui/dialog';

@Injectable()
export class ModalService {
    modalComponentRef: ComponentRef<ModalComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {}

    appendToBody(config: Partial<ModalComponent> = {}) {
        const componentFactory: ComponentFactory<ModalComponent> = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        this.modalComponentRef = componentRef;
        Object.keys(config).forEach((key: string) => {
            this.modalComponentRef.instance[key] = config[key];
        });
        this.modalComponentRef.instance['componentRef'] = this.modalComponentRef;
        this.modalComponentRef.instance['removeEvent'].subscribe((modalRef: ComponentRef<ModalComponent>) => {
            this.remove(modalRef);
        });
    }

    open<T>(component: Type<T>, config?: Partial<ModalComponent>, inputs?: Partial<T>) {
        this.appendToBody(config);
        this.modalComponentRef.instance['childComponent'] = component;
        this.modalComponentRef.instance['childComponentInputs'] = inputs;
        return this.modalComponentRef.instance['resultSubject$'];
    }

    openToast(config: Partial<ToastComponent>) {
        const componentFactory: ComponentFactory<ToastComponent> = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        Object.keys(config).forEach((key: string) => {
            componentRef.instance[key] = config[key];
        });
        componentRef.instance['componentRef'] = componentRef;
        componentRef.instance['removeEvent'].subscribe((toastRef: ComponentRef<ToastComponent>) => {
            this.remove(toastRef);
        });
    }

    close(modalRef: ComponentRef<ModalComponent>) {
        modalRef.instance.cancel();
    }

    remove<T>(componentRef: ComponentRef<T>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    repaint(modalRef: ComponentRef<ModalComponent>) {
        modalRef.instance.modal.instance.repaint();
    }

    createDialog(text: DialogText): Observable<boolean> {
        const resultSubject$ = new ReplaySubject<boolean>(1);
        const dialog = custom({
            dragEnabled: false,
            showTitle: !!text.title.length,
            title: text.title,
            messageHtml: text.messageHtml,
            buttons: [
                {
                    text: text.confirmText || 'Save',
                    type: 'default',
                    stylingMode: 'contained',
                    focusStateEnabled: false,
                    onClick: () => true,
                },
                {
                    text: text.cancelText || 'Cancel',
                    type: 'default',
                    stylingMode: 'outlined',
                    onClick: () => false,
                },
            ],
        });
        dialog.show().then((result: boolean) => {
            resultSubject$.next(result);
        });
        return resultSubject$;
    }
}
