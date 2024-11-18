import { CartItemI } from "../types/index"

const getTotalPrice = (items: CartItemI[]) => {
  const totalPrice = items.reduce((total: number, item: CartItemI) => total + item.price * item.amount, 0);

  return totalPrice;
};

export default getTotalPrice;
