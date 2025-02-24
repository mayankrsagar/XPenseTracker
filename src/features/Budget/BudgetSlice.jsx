import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: "",
  totalBudget: 0,
  edit: false,
  categoryBudgets: {
    all: { balance: 0, expense: 0, limit: "within", budget: 0 },
    food: { balance: 0, expense: 0, limit: "within", budget: 0 },
    entertainment: { balance: 0, expense: 0, limit: "within", budget: 0 },
    travel: { balance: 0, expense: 0, limit: "within", budget: 0 },
    others: { balance: 0, expense: 0, limit: "within", budget: 0 },
  },
};

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    setBudgets(state, action) {
      const { username, totalBudget, categoryBudgets } = action.payload;
      state.username = username;
      state.totalBudget = totalBudget;
      state.categoryBudgets = categoryBudgets;
    },
    updateBudgets(state, action) {
      const { totalBudget, categoryBudgets } = action.payload;
      state.totalBudget = totalBudget;
      state.categoryBudgets = categoryBudgets;
    },
    resetBudgets(state) {
      state.username = "";
      state.totalBudget = 0;
      state.edit = false;
      state.categoryBudgets = {
        all: { balance: 0, expense: 0, limit: "within", budget: 0 },
        food: { balance: 0, expense: 0, limit: "within", budget: 0 },
        travel: { balance: 0, expense: 0, limit: "within", budget: 0 },
        entertainment: { balance: 0, expense: 0, limit: "within", budget: 0 },
        others: { balance: 0, expense: 0, limit: "within", budget: 0 },
      };
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    setMoney(state, action) {
      state.categoryBudgets[action.payload["category"]] = action.payload.expenses;
    },
    
  },
});

export const { setBudgets, updateBudgets, resetBudgets, setEdit,setMoney } = budgetsSlice.actions;
export default budgetsSlice.reducer;
