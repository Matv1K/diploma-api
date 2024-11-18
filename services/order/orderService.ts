import Order from '../../models/Order';
import CartItem from '../../models/Cart-Item';

import { OrderItemI } from '../../../types';

class OrderService {
  async createNewOrder(
    userId: string,
    items: OrderItemI[],
    totalPrice: number,
    address: { country: string, city: string, address: string },
    phoneNumber: string,
  ) {
    const newOrder = new Order({ userId, items, status: 'in progress', totalPrice, address, phoneNumber });
    await newOrder.save();

    if (newOrder) {
      await CartItem.deleteMany({ userId });
    }

    return newOrder;
  };

  async fetchUserOrders(userId: string) {
    const orders = await Order.aggregate([{ $match: { userId } }, { $sort: { createdAt: -1 } }]);
    return orders;
  }
}

export default new OrderService();
