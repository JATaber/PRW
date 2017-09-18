import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom';

class Overview extends Component {
    render(){
        const storage = window.localStorage;
        let expenseTotal;
        let incomeTotal;
        let overallTotal;

        if(!storage.expenses){
            storage.setItem('expenses',JSON.stringify([{
                name: 'example',
                cost: 0.00
            }]));
        }

        if(!storage.income) {
            storage.setItem('income', JSON.stringify([{
                name: 'example',
                revenue: 0.00
            }]));
        }

        function expenseFunction(){
            let obj = JSON.parse(storage.expenses);
            expenseTotal = 0;

            for(let x in obj){
                expenseTotal += obj[x].cost;
            }

            return expenseTotal;
        }

        function incomeFunction(){
            let obj = JSON.parse(storage.income);
            incomeTotal = 0;

            for(let x in obj){
                incomeTotal += obj[x].revenue;
            }

            return incomeTotal;
        }

        function overallFunction(){
            let income = JSON.parse(storage.income);
            let expense = JSON.parse(storage.expenses);
            incomeTotal = 0;
            expenseTotal = 0;

            for(let x in income){
                incomeTotal += income[x].revenue;
            }

            for(let x in expense){
                expenseTotal += expense[x].cost;
            }

            overallTotal = incomeTotal - expenseTotal;

            return overallTotal;
        }

        return(
            <div className="content">
                <h2>OVERVIEW</h2>
                <p className="desc">This is a summary of your total income and expense</p>
                <article>
                    <p>You currently have ${overallFunction()}.</p>
                    <p>You have spent a total of ${expenseFunction()}.</p>
                    <p>You have brought in a total of ${incomeFunction()}.</p>
                </article>
            </div>
        );
    }
}

export default Overview;