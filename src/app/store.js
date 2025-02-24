import { configureStore } from '@reduxjs/toolkit';

import budgetReducer from '../features/Budget/BudgetSlice';
import transactionReducer from '../features/Transaction/TransactionSlice';

export const store = configureStore({
  reducer: {
    budget: budgetReducer,
    transaction:transactionReducer
  },
})