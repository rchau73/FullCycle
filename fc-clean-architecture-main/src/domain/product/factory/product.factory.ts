import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";
import NotificationError from "../../@shared/notification/notification.error";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new NotificationError([{
          message: `Product type ${type} not supported`,
          context: "product"
        }]);
    }
  }
}
