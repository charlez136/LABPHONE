import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ModalComponent, ToastComponent } from './components';
import { InsertionModalContentDirective } from './directives';

import { DxButtonModule, DxPopupModule, DxScrollViewModule, DxToastModule } from 'devextreme-angular';

@NgModule({
    imports: [CommonModule, DxButtonModule, DxPopupModule, DxScrollViewModule, DxToastModule],
    declarations: [InsertionModalContentDirective, ModalComponent, ToastComponent],
    exports: [ModalComponent],
})
export class ModalModule {}
