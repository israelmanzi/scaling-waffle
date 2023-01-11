import React from 'react';
import { useCheckout } from '../mock-backend';
import { Item } from '../mock-backend/data';
import styles from './index.module.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const { items, buy, balance } = useCheckout();
  React.useEffect(() => {
    toast.info('Welcome To The Create, Inc. Store', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }, []);

  const handlerProductClick = async (product: Item): Promise<void> => {
    const infoToastId = toast.info(`Trying to buy ${product.name}...`, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
    });
    const { success: successfull, message, data } = await buy(product.id);
    console.log({ successfull });
    if (successfull) {
      toast.success(`You bought ${product.name}!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      console.log(data);
    } else {
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    toast.dismiss(infoToastId);
  };

  return (
    <>
      <ToastContainer />
      <main className={styles.main}>
        <nav className={styles.nav}>
          <h1>Create, Inc. Store</h1>
          <span>Your Balance: ${balance}</span>
        </nav>
        <h3>Products</h3>

        <div className={styles.products}>
          {items
            .sort(
              // Put the items with inventory === 0 at the end
              (a) => (a.inventory === 0 ? 1 : -1)
            )
            .map((item) => (
              <div key={item.id} className={styles.product}>
                <h1>
                  {item.name} -- {item.inventory}
                </h1>
                <p>${item.price}</p>
                <button
                  className={[
                    styles.buyButton,
                    item.inventory === 0 ? styles.outOfStock : '',
                  ].join(' ')}
                  onClick={() => {
                    if (item.inventory === 0) return;
                    handlerProductClick(item);
                  }}
                >
                  {item.inventory === 0 ? 'Out of Stock' : 'BUY'}
                </button>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Index;
