import React from 'react';

import { useSelector } from 'react-redux';

const ShowBudgetTable = () => {
  const budget = useSelector((state) => state.budget.categoryBudgets);
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Category</th>
          <th>Limit Status</th>
          <th>Budget</th>
          <th>Expense</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All</td>
          <td>{budget.all.limit}</td>
          <td>{budget.all.budget}</td>
          <td>{budget.all.expense}</td>
          <td>{budget.all.balance}</td>
        </tr>
        <tr>
          <td>Food</td>
          <td>{budget.food.limit}</td>
          <td>{budget.food.budget}</td>
          <td>{budget.food.expense}</td>
          <td>{budget.food.balance}</td>
        </tr>
        <tr>
          <td>Travel</td>
          <td>{budget.travel.limit}</td>
          <td>{budget.travel.budget}</td>
          <td>{budget.travel.expense}</td>
          <td>{budget.travel.balance}</td>
        </tr>
        <tr>
          <td>Entertainment</td>
          <td>{budget.entertainment.limit}</td>
          <td>{budget.entertainment.budget}</td>
          <td>{budget.entertainment.expense}</td>
          <td>{budget.entertainment.balance}</td>
        </tr>
        <tr>
          <td>Others</td>
          <td>{budget.others.limit}</td>
          <td>{budget.others.budget}</td>
          <td>{budget.others.expense}</td>
          <td>{budget.others.balance}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ShowBudgetTable;
