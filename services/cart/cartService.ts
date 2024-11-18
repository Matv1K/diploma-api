import Cart_Item from '../../models/Cart-Item';

import getTotalPrice from '../../utils/getTotalPrice';

import { CartItemI } from '../../types';

class CartService {
  async addCartItem(data: CartItemI, userId: string) {
    const { name, image, brandName, price, color, section, instrumentId, instrumentType } = data;

    const existingItems = await Cart_Item.find({ instrumentId, userId });

    const isInTheCart = existingItems.some(existingItem =>
      existingItem.instrumentId === instrumentId && existingItem.color === color);

    if (isInTheCart) {
      throw new Error('Item is already in the cart');
    }

    const cartItem = new Cart_Item({
      name,
      image,
      brandName,
      amount: 1,
      price,
      color,
      userId,
      section,
      instrumentId,
      instrumentType,
    });

    const newCartItem = await cartItem.save();
    return { data: newCartItem, status: 201 };
  }

  async getCartItems(userId: string) {
    const cartItems = await Cart_Item.find({ userId }).lean();

    const formattedCartItems = cartItems.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));

    const totalPrice = getTotalPrice(formattedCartItems);

    return { cartItems: formattedCartItems, totalPrice };
  }

  async getCartItemsAmount(userId: string) {
    const cartItemsAmount = await Cart_Item.countDocuments({ userId });
    return cartItemsAmount;
  }

  async deleteCartItem(id: string) {
    const deletedItem = await Cart_Item.deleteOne({ _id: id });
    return deletedItem;
  }

  async increaseCartItemAmount(id: string) {
    await Cart_Item.updateOne({ _id: id }, { $inc: { amount: 1 } });
  }

  async decreaseCartItemAmount(id: string) {
    await Cart_Item.updateOne({ _id: id }, { $inc: { amount: -1 } });
  }
}

export default new CartService();
