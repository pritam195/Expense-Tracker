import React from 'react'
import Navbar from '../Components/Navbar'
import ExpenseForm from '../Components/ExpenseForm'
import rupee from '../assets/rupee.jpg'
import ExpensesTable from '../Components/ExpensesTable'

const Expenses = () => {
    return (
      <>
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${rupee})` }}>

          <div className="absolute inset-0 bg-black opacity-30 -z-10"></div>

          <Navbar />

          <div className="pt-28 px-4 flex justify-center display:flex">
                    <ExpenseForm />
                    <ExpensesTable />
          </div>
      </div>

        
        </>
    )
}

export default Expenses
