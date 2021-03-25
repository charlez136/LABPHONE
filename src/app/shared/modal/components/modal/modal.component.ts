import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InsertionModalContentDirective } from '../../../modal/directives';
import { IToolbarItem } from '../../../modal/models';

import { DxPopupComponent } from 'devextreme-angular/ui/popup';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() elementAttr: { [key: string]: string };
    @Input() childComponent: any;
    @Input() childComponentInputs: any;
    @Input() componentRef: ComponentRef<this>;
    @Input() dragEnabled: boolean = false;
    @Input() fullScreen: boolean = false;
    @Input() height: (number | string) | (() => number) = '80%';
    @Input() maxHeight: (number | string) | (() => number);
    @Input() minHeight: (number | string) | (() => number);
    @Input() title: string = '';
    @Input() visible: boolean = true;
    @Input() width: (number | string) | (() => number) = 704;
    @Input() maxWidth: (number | string) | (() => number) = null;
    @Input() acceptScroll: boolean = true;

    @Output() removeEvent: EventEmitter<ComponentRef<this>> = new EventEmitter();
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild(InsertionModalContentDirective) insertionModalContentDirective: InsertionModalContentDirective;
    @ViewChild(DxPopupComponent) modal: DxPopupComponent;

    private childComponentRef: ComponentRef<any>;
    private result: any;
    private sendResult: boolean = false;
    private destroy$: Subject<boolean> = new Subject();

    resultSubject$: Subject<any> = new Subject();
    toolbarItems: IToolbarItem[];

    constructor(private cdRef: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadChildComponent();
        this.cdRef.detach();
        this.cdRef.detectChanges();
        this.modal.instance.repaint();
    }

    closeEvent() {
        this.visibleChange.emit(false);
        this.removeEvent.emit(this.componentRef);
    }

    cancel() {
        this.visible = false;
        this.cdRef.detectChanges();
    }

    loadChildComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponent);
        const viewContainerRef = this.insertionModalContentDirective.viewContainerRef;
        viewContainerRef.clear();
        this.childComponentRef = viewContainerRef.createComponent(componentFactory);
        if (this.childComponentInputs) {
            Object.keys(this.childComponentInputs).forEach((key: string) => {
                this.childComponentRef.instance[key] = this.childComponentInputs[key];
            });
        }
        this.childComponentRef.instance['modalRef'] = this.componentRef;
    }

    set setResult(value: any) {
        this.result = value;
        if (this.sendResult) {
            this.resultSubject$.next(this.result);
        }
    }

    titleRendered(e) {
        if (!this.fullScreen) {
            const closeIcon = e.titleElement.querySelector('.dx-closebutton');
            if (closeIcon) {
                closeIcon.title = 'Close';
            }
        }
    }

    ngOnDestroy() {
        if (this.childComponentRef) {
            this.childComponentRef.destroy();
        }
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
