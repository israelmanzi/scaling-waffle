import { Item } from './data';
import { sleep } from './utils';

export type UserAndItemState = {
  balance: number;
  items: Item[];
};

export type PurchaseResponse = {
  data?: UserAndItemState;
  message?: string;
  success: boolean;
  balance: number;
};

/**
 * Modifies `state`, given an `itemId` to purchase
 * @returns {UserAndItemState} the updated state if a purchase should succeed
 */
export const executePurchase = async (
  itemId: Item['id'],
  state: UserAndItemState
): Promise<PurchaseResponse> => {
  await sleep(1000);

  const item = state.items.find((item) => item.id === itemId);

  if (!item) {
    return {
      message: `Item with id ${itemId} not found`,
      success: false,
      balance: state.balance,
    };
  }

  if (item.inventory <= 0) {
    return {
      message: `Item with id ${itemId} is out of stock`,
      success: false,
      balance: state.balance,
    };
  }

  if (state.balance < item.price) {
    return {
      message: 'Insufficient funds',
      success: false,
      balance: state.balance,
    };
  }

  return {
    balance: state.balance - item.price,
    data: {
      balance: state.balance - item.price,
      items: state.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            inventory: item.inventory - 1,
          };
        }

        return item;
      }),
    },
    success: true,
  };
};
