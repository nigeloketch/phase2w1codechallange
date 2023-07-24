// Import necessary modules and dependencies
import { useState } from 'react';
import transactionData from './db.json'
import stylesheet from './App.css'
function App() {
  // Set up state for transactions, search term, and form data
  const [transactions, setTransactions] = useState(transactionData.transactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: ''
  });

  // Handle form submission to add a new transaction to the table
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().substring(0, 10),
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount)
    };
    setTransactions([...transactions, newTransaction]);
    setFormData({
      description: '',
      category: '',
      amount: ''
    });
  };

  // Handle input change in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input change in the search bar
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter transactions by search term
  const filteredTransactions = transactions.filter(transaction => {
    return transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Render the transactions table, form, and search bar
  return (
    <div>
      <h1>Transactions</h1>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search transactions by description" />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
  {filteredTransactions.map(transaction => (
    <tr key={transaction.id}>
      <td>{transaction.id}</td>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>
        <button onClick={() => {
          const updatedTransactions = transactions.filter(t => t.id !== transaction.id);
          setTransactions(updatedTransactions);
        }}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Amount:
          <input type="text" name="amount" value={formData.amount} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default App;