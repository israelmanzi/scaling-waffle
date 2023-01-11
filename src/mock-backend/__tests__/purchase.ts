import { executePurchase } from '../purchase';

describe('Purchase', () => {
  it('should be able to purchase a product', async () => {
    const data = await executePurchase(1, {
      balance: 100,
      items: [
        {
          id: 0,
          name: 'Hair Shampoo',
          price: 5.17,
          inventory: 5,
        },
        {
          id: 1,
          name: 'Hair Conditioner',
          price: 5.85,
          inventory: 5,
        },
        {
          id: 2,
          name: 'Laptop',
          price: 517,
          inventory: 2,
        },
      ],
    });

    expect(data).toEqual({
      balance: 94.15,
      data: {
        balance: 94.15,
        items: [
          {
            id: 0,
            name: 'Hair Shampoo',
            price: 5.17,
            inventory: 5,
          },
          {
            id: 1,
            name: 'Hair Conditioner',
            price: 5.85,
            inventory: 4,
          },
          {
            id: 2,
            name: 'Laptop',
            price: 517,
            inventory: 2,
          },
        ],
      },
      success: true,
    });
    expect(data.data?.balance).toBe(94.15);

    expect(data.data?.items[0].inventory).toBe(5);
    expect(data.data?.items[1].inventory).toBe(4);
    expect(data.data?.items[2].inventory).toBe(2);

    expect(data.success).toBe(true);
  });
});
