import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
} from "@angular/core";
import { Product } from "@core/models";
import { ProductService } from "@core/service/productApi/product-api.service";
import { ModalComponent } from "src/app/shared/modal/components";
import { ModalService } from "src/app/shared/modal/services";

@Component({
  selector: "app-pay",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditItemComponent {
  @Input() item: Product = new Product();
  @Input() isChange: boolean = false;
  @Input() modalRef: ComponentRef<ModalComponent>;

  _itemErr: boolean = false;

  get itemErr() {
    return this._itemErr;
  }

  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private cdRef: ChangeDetectorRef
  ) {}
  onSubmit() {
    this.isChange
      ? this.productService.edit(this.item).subscribe(
          () => {
            this._itemErr = false;
            this.modalService.close(this.modalRef);
          },
          (err) => {
            this._itemErr = true;
            this.cdRef.detectChanges();
          }
        )
      : this.productService.add(this.item).subscribe(
          () => {
            this._itemErr = false;
            this.modalService.close(this.modalRef);
          },
          (err) => {
            this._itemErr = true;
            this.cdRef.detectChanges();
          }
        );
  }
}
