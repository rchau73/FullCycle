import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
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
    try {
      const sequelize = OrderModel.sequelize;
      await sequelize.transaction(async (t) => {
        await OrderItemModel.destroy({
          where: { order_id: entity.id },
          transaction: t,
        });
        const items = entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        }

        ));
        await OrderItemModel.bulkCreate(items, { transaction: t });
        await OrderModel.update(
          { total: entity.total() },
          { where: { id: entity.id }, transaction: t }
        );
    });}
    catch (error) {
      throw new Error("Failed to update order");
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try{
        orderModel = await OrderModel.findOne({
            where: {
                id: id,
            },
            include: [{ model: OrderItemModel }],
            rejectOnEmpty: true,
        })
    }
    catch (error){
        throw new Error("Order not found")
    }

    const orderItems: OrderItem[] = [];
    orderModel.items.map(item => {
        const orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        orderItems.push(orderItem);
    });
    const order = new Order(id, orderModel.customer_id, orderItems);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const ordersModels = await OrderModel.findAll({
        include: [{ model: OrderItemModel }],
    });

    const orders = ordersModels.map((ordersModels) => {
        const orderItems: OrderItem[] = [];
        ordersModels.items.map(item => {
            const orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            orderItems.push(orderItem);
        });
        const order = new Order(ordersModels.id, ordersModels.customer_id, orderItems);
        return order;
    } )
    return orders;
  }
}