import { Component, OnInit } from "@angular/core";
import { Product, User } from "@core/models";
import { AuthenticationService } from "@core/service/authentification";
import { ProductService } from "@core/service/productApi/product-api.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EditItemComponent } from "src/app/modals/edit-item/edit-item.component";
import { ModalService } from "src/app/shared/modal/services";

@Component({
  selector: "app-pay",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  currentUser: User;
  get getUser(): User {
    return this.currentUser;
  }
  private _items: Product[];
  private destroy$: Subject<boolean> = new Subject();
  get items(): Product[] {
    return this._items;
  }
  ngOnInit() {
    this.productService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this._items = res));
  }

  columns = [
    { dataField: "name", caption: "Название" },
    { dataField: "description", caption: "Описание", allowFiltering: false },
    { dataField: "partNum", caption: "Парт. Номер" },
    {
      dataType: "number",
      dataField: "price",
      caption: "Цена",
      allowFiltering: true,
      selectedFilterOperation: "between",
      calculateDisplayValue: this.priceValueDisplay,
    },
  ];

  operationDescriptions: any = {
    between: "Между",
    contains: "Включает",
    endsWith: "Оканчивается",
    equal: "Равняется",
    greaterThan: "Строго больше",
    greaterThanOrEqual: "Больше или равно",
    lessThan: "Строго меньше",
    lessThanOrEqual: "Меньше или равно",
    notContains: "Не содержит",
    notEqual: "Не равно",
    startsWith: "Начинается с",
  };

  sorting: any = {
    ascendingText: "Сортировать по возростанию",
    clearText: "Очистить",
    descendingText: "Сортировать по убыванию",
    mode: "single",
    showSortIndexes: true,
  };

  priceValueDisplay(rowData: any) {
    return `${rowData.price} Руб.`;
  }

  openOnEdit(event: any) {
    if (this.getUser?.role) {
      this.modalService.open(
        EditItemComponent,
        {
          title: "Редактирование товара",
          height: 510,
          width: 400,
          dragEnabled: true,
        },
        {
          item: event.data,
          isChange: true,
        }
      );
    }
  }

  openModalCreate() {
    this.modalService.open(EditItemComponent, {
      title: "Добавление товара",
      height: 510,
      width: 400,
      dragEnabled: true,
    });
  }
}
