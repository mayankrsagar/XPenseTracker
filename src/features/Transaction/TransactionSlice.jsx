import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transaction: [],
  filter: "all",
};

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addExpense(state, action) {
      state.transaction.push(action.payload);
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    deleteTransaction(state, action) {
      state.transaction = state.transaction.filter(ele => ele.id !== action.payload);
    },
    resetTransaction(state){
      state.transaction=[];
    }
  },
});

export const { addExpense, changeFilter, deleteTransaction, resetTransaction } = TransactionSlice.actions;

export default TransactionSlice.reducer;
