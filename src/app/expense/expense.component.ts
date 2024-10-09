import { Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from './expense.model';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | undefined;

  expense: Expense = {
    id: 0, name: '', date: new Date(), category: '', amount: 0
  };
  expenses: Expense[] = [];
  tempExp: Expense[] = [];
  err = ""
  selectedName: string = '';
  category: any[] = ['Food', 'Shopping / Groceries', 'Travel', 'Entertainment', 'EMI', 'House Rent', 'Others'];
  private nextId = 1;
  familyNames: string[] | undefined;
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
        this.expense.id = this.expenses.length + 1;
      }
      this.expenses.push({ ...this.expense });

      this.expenses.forEach(exp => {
        this.tempExp[exp.id - 1] = exp;
      });
      // console.log(this.tempExp);

      this.expenses = this.tempExp;
      this.saveExpense();
      this.expenseTracker();
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
    this.expenseTracker();
  }

  updateExpense(id: number) {
    this.expense = Object.assign({}, this.expenses.find(exp => exp.id === id));
    this.expenseTracker();

  }

  private saveExpense() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

  selected() {
    this.expenseTracker();
  }

  private expenseTracker() {

    let foodExp = 0;
    let shopExp = 0;
    let travelExp = 0;
    let entertainmentExp = 0;
    let emiExp = 0;
    let rentExp = 0;
    let otherExp = 0;

    if (this.selectedName) {
      this.expenses.forEach(exp => {
        if (exp.name == this.selectedName) {
          switch (exp.category) {
            case 'Food':
              foodExp = foodExp + exp.amount
              break
            case 'Shopping / Groceries':
              shopExp = shopExp + exp.amount
              break;
            case 'Travel':
              travelExp = travelExp + exp.amount
              break;
            case 'Entertainment':
              entertainmentExp = entertainmentExp + exp.amount
              break;
            case 'EMI':
              emiExp = emiExp + exp.amount
              break;
            case 'House Rent':
              rentExp = rentExp + exp.amount
              break;
            case 'Others':
              otherExp = otherExp + exp.amount
              break;

          }
        }
      })
    }
    else {
      this.expenses.forEach(exp => {
          switch (exp.category) {
            case 'Food':
              foodExp = foodExp + exp.amount
              break
            case 'Shopping / Groceries':
              shopExp = shopExp + exp.amount
              break;
            case 'Travel':
              travelExp = travelExp + exp.amount
              break;
            case 'Entertainment':
              entertainmentExp = entertainmentExp + exp.amount
              break;
            case 'EMI':
              emiExp = emiExp + exp.amount
              break;
            case 'House Rent':
              rentExp = rentExp + exp.amount
              break;
            case 'Others':
              otherExp = otherExp + exp.amount
              break;

          }
        })
      }

    this.chartOptions = {
          series: [foodExp, shopExp, travelExp, entertainmentExp, emiExp, rentExp, otherExp],
          chart: {
            type: "donut",
          },
          labels: ['Food', 'Shopping / Groceries', 'Travel', 'Entertainment', 'EMI', 'House Rent', 'Others'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 250,
                },
                legend: {
                  position: "bottom",
                },
                colors: ['black']
              }
            }
          ]
        }

  }

  private loadExpense() {
    const storedExpense = localStorage.getItem('expenses');
    const familyNames = localStorage.getItem('familyMember');


    this.familyNames = familyNames?.split('\n')
    if (storedExpense) {
      this.expenses = JSON.parse(storedExpense);
      this.nextId = this.expenses.length + 1;
    }

    this.expenseTracker();
  }

}
