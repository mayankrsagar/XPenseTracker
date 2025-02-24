import React from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { setMoney } from '../../features/Budget/BudgetSlice';
import { deleteTransaction } from '../../features/Transaction/TransactionSlice';

const FilterTable = () => {
  const transactions = useSelector((state) => state.transaction.transaction);
  const formData = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  const handleDelete = (id, selectedCategory, expenseAmount) => {
    // Delete the transaction
    dispatch(deleteTransaction(id));

    // Update the overall "all" category
    const allData = formData.categoryBudgets.all;
    const allBudget = allData.budget;
    const currentAllExpense = Number(allData.expense);
    const newAllExpense = currentAllExpense - expenseAmount;
    const newAllBalance = allBudget - newAllExpense;
    const newAllLimit = newAllExpense > allBudget ? "exceed" : "within";

    dispatch(setMoney({
      category: "all",
      expenses: {
        budget: allBudget,
        expense: newAllExpense,
        balance: newAllBalance,
        limit: newAllLimit,
      }
    }));

    // Update the selected category budget
    const selectedData = formData.categoryBudgets[selectedCategory];
    const { budget, expense } = selectedData;
    const newExpense = Number(expense) - expenseAmount;
    const newBalance = budget - newExpense; // balance = budget - expense
    const newLimit = newExpense > budget ? "exceed" : "within";

    dispatch(setMoney({
      category: selectedCategory,
      expenses: {
        budget,
        expense: newExpense,
        balance: newBalance,
        limit: newLimit,
      }
    }));

    // Save updated formData to local storage
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  return (
    <>
      <div>
        <span>Filter</span>
        <button>All</button>
        <button>Food</button>
        <button>Entertainment</button>
        <button>Travel</button>
        <button>Others</button>
      </div>
      {transactions && transactions.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Transaction</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((ele, index) => (
              <tr key={ele.id}>
                <td>{index + 1}</td>
                <td>{ele.expenseName}</td>
                <td>{ele.category}</td>
                <td>{ele.expenseAmount}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDelete(ele.id, ele.category, parseFloat(ele.expenseAmount))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default FilterTable;
