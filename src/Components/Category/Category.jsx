import { Fragment } from 'react';

import styles from './Category.module.css';

const Category = ({ handleChange, categoryValue }) => {
  return (
    <Fragment>
      <div className={styles.category}>
        <div className={styles.insideCategory}>
          <label htmlFor="food">Food</label>
          <input
            type="number"
            name="food"
            id="food"
            value={categoryValue.food.budget}
            onChange={handleChange}
          />
        </div>
        <div className={styles.insideCategory}>
          <label htmlFor="travel">Travel</label>
          <input
            type="number"
            name="travel"
            id="travel"
            value={categoryValue.travel.budget}
            onChange={handleChange}
          />
        </div>
        <div className={styles.insideCategory}>
          <label htmlFor="entertainment">Entertainment</label>
          <input
            type="number"
            name="entertainment"
            id="entertainment"
            value={categoryValue.entertainment.budget}
            onChange={handleChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
