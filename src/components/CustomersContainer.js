import React, { Component } from 'react'
import axios from 'axios'

class CustomersContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	query: '',
	    customers: [],
	    company: '*'
	  }
	  this.handleSearchInput = this.handleSearchInput.bind(this);
//      this.handleQuery = this.handleQuery.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.handleDropdownChange = this.handleDropdownChange.bind(this);
	}

	componentDidMount() {
  		axios.get('http://localhost:3001/api/v1/customers.json')
  		.then(response => {
    		this.setState({customers: response.data})
  		})
  		.catch(error => console.log(error))
	}
	
	handleSearchInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

	handleButtonClick = (name) => {
		alert(name);
		console.log("here");
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
		            <option value="*">All</option>
		            <option value="Dolby">Dolby</option>
		            <option value="Apple">Apple</option>
		            <option value="Tesla">Tesla</option>
		          </select>
		        </label> 

		        <input type="submit" value="Submit" />
		     </form>

	         <br />
	        <table align="center">
	          <thead>
			    <tr>
			      <th>Firstname</th>
			      <th>Lastname</th>
			      <th>Company</th>
			      <th>Share</th>
			      <th colSpan="4"></th>
			    </tr>
			  </thead>
			  <tbody>
			  	 {this.state.customers.map((customer) => {
			  	 	return (
		             <tr key={customer.id}>
			            <td>{customer.firstname}</td>
			            <td>{customer.lastname}</td>
			            <td>{customer.company_name}</td>
			            <td><button onClick={() => {this.handleButtonClick(customer.firstname)}}>Share
    						</button>
    					</td>
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