import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  async update(entity: Order): Promise<void> {
    await entity.items.map((item) => ({
      OrderItemModel.update(
        {
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        },
        {
          where: {
            id: item.id,
          },
        },
      )
    }))
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          OrderItemModel.update(
            
        })),
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order(id, orderModel.customer_id, orderModel.items);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();

    const orders = orderModels.map((orderModels) => {
      let order = new Order(orderModels.id, orderModels.customer_id, orderModels.items);
      return order;
    });

    return orders;
  }
}
