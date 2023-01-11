import React from 'react';
import { initialBalance, initialItems, Item } from './data';
import { executePurchase, PurchaseResponse } from './purchase';

type UseCheckout = {
  items: Item[];

  /**
   * Charges the current account with the `price` in USD and decrements an item's inventory
   *
   * @throws if the current account does not have enough or if no inventory
   *
   */
  buy: (itemId: Item['id']) => Promise<PurchaseResponse>;
  balance: number;
};

export const useCheckout = (): UseCheckout => {
  const [balance, setBalance] = React.useState<number>(initialBalance);
  const [items, setItems] = React.useState<Item[]>(initialItems);
  return {
    buy: async (itemId: Item['id']) => {
      const newState = await executePurchase(itemId, {
        balance,
        items: items,
      });
      if (newState.success) setItems(newState.data!.items);
      setBalance(newState.balance);
      return newState;
    },
    items,
    balance,
  };
};
