import React, { Component } from 'react'
import axios from 'axios'

class CustomersContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	query: '',
	    customers: [],
	    company: 'All',
	    companies: []
	  }
	  this.handleSearchInput = this.handleSearchInput.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.handleDropdownChange = this.handleDropdownChange.bind(this);
	}

	componentDidMount() {
  		axios.get('http://localhost:3001/api/v1/customers.json')
  		.then(response => {
  			 var customers_list = response.data
  			 var companies_list = [...new Set(customers_list.map(item => item.company_name))];
  			 companies_list.unshift('All')
    		this.setState({customers: customers_list, companies: companies_list})
  		})
  		.catch(error => console.log(error))
	}
	
	handleSearchInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

	handleButtonClick = (user) => {		
		prompt("Share link", 'http://localhost:3001/api/v1/customers.json?by_full_name=' + this.state.query + '&by_company=' + this.state.company);
	}

	handleDropdownChange = (event) => {
	    this.setState({company: event.target.value});
	  }

	handleSubmit = (event) => {
        axios.get('http://localhost:3001/api/v1/customers.json?by_full_name=' + this.state.query + '&by_company=' + this.state.company)
        .then(response => {
    		this.setState({customers: response.data})
        })
        .catch(error => console.log(error));
        event.preventDefault();
	 }

	render() {
	   return (
	   	<div>
		   	<form onSubmit={this.handleSubmit}>
	          	Search Customers: <input type="text" size="25"
	            			name="query" placeholder="Enter customer name"
	            			value={this.state.query} onChange={this.handleSearchInput}/>
		        <label> Filter by Company:
		          <select value={this.state.company} onChange={this.handleDropdownChange}>
		          	{ this.state.companies.map ((company) => {
		          		return (
							<option  key={company} value={company}>{company}</option>
		          		)
		          	})}
		          </select>
		        </label>
		        <br /><br />
		        <input type="submit" value="Search" /><br /><br />
		        <button onClick={this.handleButtonClick}>Share link to Search</button>
		        
		     </form>

	         <br />
	        <table align="center">
	          <thead>
			    <tr>
			      <th>Firstname</th>
			      <th>Lastname</th>
			      <th>Company</th>
			      <th colSpan="3"></th>
			    </tr>
			  </thead>
			  <tbody>
			  	 {this.state.customers.map((customer) => {
			  	 	return (
		             <tr key={customer.id}>
			            <td>{customer.firstname}</td>
			            <td>{customer.lastname}</td>
			            <td>{customer.company_name}</td>
			          </tr>
			        )
			      })}
		      </tbody>
	        </table>
		 </div>
	    )
	 }
}

export default CustomersContainer