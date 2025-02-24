import React, { useEffect } from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router';

import ExpenseForm from '../../Components/ExpenseForm/ExpenseForm';
import FilterTable from '../../Components/FilterTable/FilterTable';
import ShowBudgetTable from '../../Components/ShowBudgetTable/ShowBudgetTable';
import { setEdit } from '../../features/Budget/BudgetSlice';
import style from './Transaction.module.css';

const Transaction = () => {

const dispatch=useDispatch();
  const formData=useSelector(state=>state.budget);
  const navigation=useNavigate();
  const handleClick=()=>{
    dispatch(setEdit(true));
    localStorage.setItem("formData",JSON.stringify(formData))
    navigation("/")
  }
  useEffect(()=>{
    localStorage.setItem("formData",JSON.stringify(formData));

  },[formData]);
  return (
    <>
    
    <div className={style.heading}><h1>
      {formData["username"]} Monthly Expenditure</h1>
      <button onClick={handleClick}>New/Update Tracker</button></div>
      <ShowBudgetTable/>
      <ExpenseForm/>
     <FilterTable/>
    </>
  )
}

export default Transaction