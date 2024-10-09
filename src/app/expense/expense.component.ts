import { Component, OnInit } from '@angular/core';
import { Expense } from './expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expense: Expense = {
    id: 0, name: '', date: new Date(), category: '', amount: 0
  };
  expenses: Expense[] = [];
  tempExp: Expense[] = [];
  err = ""
  private nextId = 1;
  ngOnInit(): void {
    this.loadExpense();
  }

  constructor() {
    this.reset();
  }


  addExpense() {
    if (this.expense.name && this.expense.category && this.expense.amount > 0) {
      if (this.expense.id != 0) {
        this.expenses = this.expenses.filter(exp => exp.id !== this.expense.id);
      } else {
        this.expense.id = this.expenses.length+1;
      }
      this.expenses.push({ ...this.expense });

      this.expenses.forEach(exp => {
        this.tempExp[exp.id -1] = exp;
      });
      // console.log(this.tempExp);
      
      this.expenses = this.tempExp;
      this.saveExpense();
      this.reset();
    }
    else {
      this.err = "fill all values before submitting"
    }

  }

  reset() {
    this.expense = { id: 0, name: '', date: new Date(), category: '', amount: 0 }
  }

  deleteExpense(id: number) {
    this.expenses = this.expenses.filter(exp => exp.id !== id);
    let value = 1;
    this.expenses.map(exp => {
      exp.id = value++;
    })
    this.saveExpense();
  }


  updateExpense(id: number) {
    this.expense = Object.assign({}, this.expenses.find(exp => exp.id === id));

  }

  private saveExpense() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  private loadExpense() {
    const storedExpense = localStorage.getItem('expenses');
    if (storedExpense) {
      this.expenses = JSON.parse(storedExpense);
      this.nextId = this.expenses.length + 1;
    }
  }

}
