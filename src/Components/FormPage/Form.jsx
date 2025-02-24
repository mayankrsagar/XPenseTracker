import {
  Fragment,
  useEffect,
  useState,
} from 'react';

import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  resetBudgets,
  setBudgets,
} from '../../features/Budget/BudgetSlice';
import { resetTransaction } from '../../features/Transaction/TransactionSlice';
import Category from '../Category/Category';

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    totalBudget: 0,
    edit: false,
    categoryBudgets: {
      all: { balance: 0, expense: 0, limit: "within", budget: 0 },
      food: { balance: 0, expense: 0, limit: "within", budget: 0 },
      travel: { balance: 0, expense: 0, limit: "within", budget: 0 },
      entertainment: { balance: 0, expense: 0, limit: "within", budget: 0 },
      others: { balance: 0, expense: 0, limit: "within", budget: 0 },
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.edit) {
          setFormData(parsedData);
        }
      } catch (error) {
        console.error("Error parsing stored formData:", error);
      }
    }
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validation = () => {
    const { username, totalBudget, categoryBudgets } = formData;
    const totalBudgetNum = Number(totalBudget);
    const foodBudget = Number(categoryBudgets.food.budget);
    const travelBudget = Number(categoryBudgets.travel.budget);
    const entertainmentBudget = Number(categoryBudgets.entertainment.budget);
    const totalAllocated = foodBudget + travelBudget + entertainmentBudget;

    if (!username.trim() || totalBudgetNum <= 0) {
      enqueueSnackbar(
        "All fields are required and budget must be greater than 0.",
        { variant: "warning" }
      );
      return false;
    }

    if (totalAllocated > totalBudgetNum) {
      enqueueSnackbar(
        "Total categorical budget should not exceed monthly budget",
        { variant: "warning" }
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;
    const allExpense =
    formData["categoryBudgets"]["entertainment"]["expense"] +
    formData["categoryBudgets"]["food"]["expense"] +
    formData["categoryBudgets"]["others"]["expense"] +
    formData["categoryBudgets"]["travel"]["expense"];

    const totalBudgetNum = Number(formData.totalBudget);
    const foodBudget = Number(formData.categoryBudgets.food.budget);
    const travelBudget = Number(formData.categoryBudgets.travel.budget);
    const entertainmentBudget = Number(
      formData.categoryBudgets.entertainment.budget
    );
    const totalAllocated = foodBudget + travelBudget + entertainmentBudget;
    const remainingBudget = totalBudgetNum - totalAllocated;
    const remainingBalance =
      totalBudgetNum -
      totalAllocated -
      Number(formData["categoryBudgets"]["others"]["expense"]);
    // Compute updated form data with the "others" category updated and edit set to true
    const updatedFormData = {
      ...formData,
      categoryBudgets: {
        ...formData.categoryBudgets,
        others: {
          ...formData.categoryBudgets.others,
          balance: remainingBalance,
          budget: remainingBudget,
        },
        all:{
          ...formData.categoryBudgets.all,
          expense:allExpense,
          balance:formData["categoryBudgets"]["all"]["budget"]-allExpense,
          limit:allExpense>formData["categoryBudgets"]["all"]["budget"]?"exceed":"withing",
        }
      },
      // edit: true,
    };

    setFormData(updatedFormData);
    dispatch(setBudgets(updatedFormData));
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
    navigate("/transaction");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //Calculate Expense & Balance of All category
    const allExpense =
      formData["categoryBudgets"]["entertainment"]["expense"] +
      formData["categoryBudgets"]["food"]["expense"] +
      formData["categoryBudgets"]["others"]["expense"] +
      formData["categoryBudgets"]["travel"]["expense"];

    if (name === "totalBudget") {
      const numericValue = Number(value);

      setFormData((prev) => ({
        ...prev,
        totalBudget: numericValue,
        categoryBudgets: {
          ...prev.categoryBudgets,
          all: {
            ...prev.categoryBudgets.all,
            balance: numericValue - allExpense,
            budget: numericValue,
            expense: allExpense,
            limit: allExpense > numericValue ? "exceed" : "within",
          },
        },
      }));
    } else if (["food", "travel", "entertainment"].includes(name)) {
      const numericValue = Number(value);
      setFormData((prev) => ({
        ...prev,
        categoryBudgets: {
          ...prev.categoryBudgets,
          [name]: {
            ...prev.categoryBudgets[name],
            balance:
              numericValue - formData["categoryBudgets"][name]["expense"],
            budget: numericValue,
          },all: {
            ...prev.categoryBudgets.all,
            balance: formData["categoryBudgets"]["all"]["budget"] - allExpense,
            expense: allExpense,
            limit: allExpense > formData["categoryBudgets"]["all"]["budget"] ? "exceed" : "within",
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleReset = () => {
    dispatch(resetBudgets());
    dispatch(resetTransaction());
    localStorage.removeItem("formData");
    const initialFormData = {
      username: "",
      totalBudget: 0,
      edit: false,
      categoryBudgets: {
        all: { balance: 0, expense: 0, limit: "within", budget: 0 },
        food: { balance: 0, expense: 0, limit: "within", budget: 0 },
        travel: { balance: 0, expense: 0, limit: "within", budget: 0 },
        entertainment: { balance: 0, expense: 0, limit: "within", budget: 0 },
        others: { balance: 0, expense: 0, limit: "within", budget: 0 },
      },
    };
    setFormData(initialFormData);
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit} name="landing-page-form">
        <div>
          <label htmlFor="name">Enter your name:</label>
          <input
            type="text"
            name="username"
            id="name"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="budget">Enter your monthly budget:</label>
          <input
            type="number"
            name="totalBudget"
            id="budget"
            value={formData.totalBudget}
            onChange={handleChange}
          />
        </div>
        <p>Fill your monthly categorical budget:</p>
        <Category
          handleChange={handleChange}
          categoryValue={formData.categoryBudgets}
        />
        {formData["edit"] ? (
          <div>
            <div>
              <button type="button" onClick={handleSubmit} id="new-update">
                New/Update Tracker
              </button>
              <button type="button" onClick={handleReset} id="clear">
                Start New Tracker
              </button>
              <button type="button" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </Fragment>
  );
};

export default Form;
