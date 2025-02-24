import React, { useState } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { setMoney } from '../../features/Budget/BudgetSlice';
import { addExpense } from '../../features/Transaction/TransactionSlice';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    expenseAmount: "",
    category: ""
  });
  const { categoryBudgets } = useSelector(state => state.budget);
  const formData = useSelector(state => state.budget);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { ...expenseData, id: uuidv4() };
    const expenseAmt = parseFloat(expenseData.expenseAmount);

    // Update the selected category by adding the new expense amount to its existing expense.
    const selectedCategoryBudget = categoryBudgets[expenseData.category];
    if (selectedCategoryBudget) {
      const { budget, expense } = selectedCategoryBudget;
      const currentCategoryExpense = Number(expense);
      const newCategoryExpense = currentCategoryExpense + expenseAmt;
      const newCategoryBalance = budget - newCategoryExpense;

      if (newCategoryBalance < 0) {
        const confirmAdd = window.confirm("Expense exceeds budgets. Do you want to proceed?");
        if (!confirmAdd) {
          return;
        }
      }

      dispatch(setMoney({
        category: expenseData.category,
        expenses: { 
          budget, 
          balance: newCategoryBalance, 
          limit: newCategoryBalance < 0 ? "exceed" : "within", 
          expense: newCategoryExpense 
        }
      }));
    }

    // Update the overall "all" category. This sums the expense from all categories.
    const allCategory = categoryBudgets.all;
    const currentAllExpense = Number(allCategory.expense);
    const newAllExpense = currentAllExpense + expenseAmt;
    const newAllBalance = allCategory.budget - newAllExpense;
    dispatch(setMoney({
      category: "all",
      expenses: { 
        budget: allCategory.budget, 
        balance: newAllBalance, 
        limit: newAllBalance < 0 ? "exceed" : "within", 
        expense: newAllExpense 
      }
    }));

    localStorage.setItem("formData", JSON.stringify(formData));
    dispatch(addExpense(newExpense));

    // Reset the form
    setExpenseData({
      expenseName: "",
      expenseAmount: "",
      category: ""
    });
  };

  return (
    <div>
      <div className='title'>New Expense Form</div>
      <form onSubmit={handleSubmit} className='expense-form1'>
        <div className='expense-form-input'>
        <div>
          <label htmlFor="expense-name">Expense Name:</label>
          <input
            type="text"
            name="expenseName"
            id="expense-name"
            value={expenseData.expenseName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="expense-amount">Expense Amount:</label>
          <input
            type="number"
            name="expenseAmount"
            id="expense-amount"
            value={expenseData.expenseAmount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category-select">Category:</label>
          <select
            name="category"
            id="category-select"
            value={expenseData.category}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="others">Others</option>
          </select>
        </div>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
