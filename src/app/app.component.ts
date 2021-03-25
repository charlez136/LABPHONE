import { Component, OnInit } from "@angular/core";
import { User } from "@core/models";
import { AuthenticationService } from "@core/service/authentification";
import { ProductService } from "@core/service/productApi/product-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  currentUser: User;
  items = [{ text: "Выйти" }];
  get getUser(): User {
    return this.currentUser;
  }
  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  ngOnInit() {
    const products = [
      {
        id: 1,
        name: "Смартфон XIAOMI Redmi Note 9 Pro 6/128Gb,  серый",
        description:
          "Qualcomm Snapdragon 888, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380949,
        price: 15000,
      },
      {
        id: 2,
        name: "Смартфон XIAOMI Redmi 9 64Gb,  серый",
        description:
          "Qualcomm Snapdragon 865, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380950,
        price: 14500,
      },
      {
        id: 3,
        name: "Смартфон SAMSUNG Galaxy A51 64Gb,  SM-A515F,  черный",
        description:
          "Qualcomm Snapdragon 720, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380951,
        price: 9959,
      },
      {
        id: 4,
        name: "Смартфон XIAOMI Redmi 9A 32Gb,  серый,  серый",
        description:
          "Qualcomm Snapdragon 710, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380948,
        price: 10090,
      },
      {
        id: 5,
        name: "Смартфон SAMSUNG Galaxy M21 64Gb,  SM-M215F,  черный",
        description:
          "Qualcomm Snapdragon 730, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380947,
        price: 19039,
      },
      {
        id: 6,
        name: "Смартфон XIAOMI Redmi 9C 64Gb,  серый",
        description:
          "Qualcomm Snapdragon 700G, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380946,
        price: 20990,
      },
      {
        id: 7,
        name: "Смартфон XIAOMI Redmi 9A 32Gb,  зеленый",
        description:
          "Qualcomm Snapdragon 678, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380945,
        price: 39250,
      },
      {
        id: 8,
        name: "Смартфон ZTE Blade 20 Smart 128Gb,  черный",
        description:
          "Qualcomm Snapdragon 675, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380944,
        price: 23456,
      },
      {
        id: 9,
        name: "Смартфон SAMSUNG Galaxy M31 128Gb,  SM-M315F,  черный",
        description:
          "Qualcomm Snapdragon 777, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380943,
        price: 8790,
      },
      {
        id: 10,
        name: "Смартфон SAMSUNG Galaxy A51 128Gb,  SM-A515F,  черный",
        description:
          "Qualcomm Snapdragon 666, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380942,
        price: 39245,
      },
      {
        id: 11,
        name: "Смартфон MOTOROLA G9 Plus 128Gb,  XT2087-2,  синий",
        description:
          "Qualcomm Snapdragon 333, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380941,
        price: 12424,
      },
      {
        id: 12,
        name: "Смартфон SAMSUNG Galaxy A71 128Gb,  SM-A715F,  черный",
        description:
          "Qualcomm Snapdragon 222, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1380940,
        price: 12453,
      },
      {
        id: 13,
        name: "Смартфон XIAOMI Redmi Note 8 Pro 6/64Gb,  серый минеральный",
        description:
          "Qualcomm Snapdragon 345, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1480949,
        price: 8935,
      },
      {
        id: 14,
        name: "Смартфон XIAOMI Redmi 9 32Gb,  фиолетовый",
        description:
          "Qualcomm Snapdragon 653, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1580949,
        price: 56243,
      },
      {
        id: 15,
        name: "Смартфон APPLE iPhone 11 128Gb,  MHDH3RU/A,  черный",
        description:
          "Qualcomm Snapdragon 875, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1680949,
        price: 19345,
      },
      {
        id: 16,
        name: "Смартфон SAMSUNG Galaxy M21 64Gb,  SM-M215F,  бирюзовый",
        description:
          "Qualcomm Snapdragon 674, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1780949,
        price: 12423,
      },
      {
        id: 17,
        name: "Смартфон XIAOMI Poco M3 128Gb,  черный",
        description:
          "Qualcomm Snapdragon 893, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1880949,
        price: 16765,
      },
      {
        id: 18,
        name: "Смартфон APPLE iPhone SE 2020 64Gb,  MHGP3RU/A,  черный",
        description:
          "Qualcomm Snapdragon 432, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1980949,
        price: 28932,
      },
      {
        id: 19,
        name: "Смартфон ZTE Blade A5 2019 32Gb,  синий",
        description:
          "Qualcomm Snapdragon 123, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1370949,
        price: 99783,
      },
      {
        id: 20,
        name: "Смартфон APPLE iPhone XR 64Gb,  MH6M3RU/A,  черный",
        description:
          "Qualcomm Snapdragon 653, 2300МГц, 8-ми ядерный, 2400x1080, IPS",
        partNum: 1360949,
        price: 12453,
      },
    ];
    this.productService.getAll().subscribe((res) => {
      if (!res.length) {
        localStorage.setItem("products", JSON.stringify(products));
      }
    });
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: 1,
            username: "admin@admin.com",
            password: "admin",
            firstName: "admin",
            lastName: "admin",
            role: 1,
          },
        ])
      );
    }
  }

  itemClick(event) {
    if (event.itemData.text === "Выйти") {
      this.authenticationService.logout();
    }
  }
}
