import Liked_Item from '../../models/Liked-Item';

import { LikedItemI } from '../../../types';

class LikedItemService {
  async addLikedItem(itemData: LikedItemI, userId: string) {
    const likedItem = new Liked_Item({ ...itemData, userId, amount: 1 });
    return await likedItem.save();
  };

  async fetchLikedItems(userId: string | undefined) {
    const likedItems = await Liked_Item.find({ userId });
    return likedItems;
  }

  async fetchLikedStatus(instrumentId: string, userId: string) {
    const likedItem = await Liked_Item.findOne({ userId, instrumentId });
    return likedItem !== null;
  };

  async removeLikedItem(instrumentId: string, userId: string) {
    await Liked_Item.deleteOne({ userId, instrumentId });
  }
}

export default new LikedItemService();
