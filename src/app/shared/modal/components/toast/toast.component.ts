import { ChangeDetectionStrategy, Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
    @Input() closeOnOutsideClick: boolean = true;
    @Input() componentRef: ComponentRef<this>;
    @Input() displayTime: number = 2000;
    @Input() message: string;
    @Input() visible: boolean = true;
    @Input() width: number = 688;

    @Output() removeEvent: EventEmitter<ComponentRef<this>> = new EventEmitter();

    closeEvent() {
        this.removeEvent.emit(this.componentRef);
    }

    close() {
        this.visible = false;
    }
}
