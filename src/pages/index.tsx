import React from 'react';
import { useCheckout } from '../mock-backend';
import { initialItems } from '../mock-backend/data';
import styles from './index.module.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  // const { items, buy } = useCheckout();
  React.useEffect(() => {
    toast.info('Welcome To The Create, Inc. Store', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }, []);
  return (
    <>
      <ToastContainer />
      <main className={styles.main}>
        <h1>Create, Inc. Store</h1>
        <h3>Products</h3>

        <div className={styles.products}>
          {initialItems
            .sort(
              // Put the items with inventory === 0 at the end
              (a) => (a.inventory === 0 ? 1 : -1)
            )
            .map((item) => (
              <div key={item.id} className={styles.product}>
                <h1>{item.name}</h1>
                <p>${item.price}</p>
                <button
                  className={[
                    styles.buyButton,
                    item.inventory === 0 ? styles.outOfStock : '',
                  ].join(' ')}
                  onClick={() => {
                    if (item.inventory === 0) return;
                    // buy(item.id);
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
