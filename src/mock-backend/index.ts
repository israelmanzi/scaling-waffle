import { initialBalance, initialItems, Item } from './data';
import { executePurchase } from './purchase';

type UseCheckout = {
  items: Item[];

  /**
   * Charges the current account with the `price` in USD and decrements an item's inventory
   *
   * @throws if the current account does not have enough or if no inventory
   *
   */
  buy: (itemId: Item['id']) => Promise<void>;
};

export const useCheckout = (): UseCheckout => ({
  buy: async (itemId: Item['id']) => {
    await executePurchase(itemId, {
      balance: initialBalance,
      items: initialItems,
    });
  },
  items: initialItems,
});
