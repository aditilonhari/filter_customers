import React, { Component } from 'react'
import axios from 'axios'

class CustomersContainer extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	query: '',
	    customers: []
	  }
	  this.handleInput = this.handleInput.bind(this);
      this.handleQuery = this.handleQuery.bind(this);
	}

	componentDidMount() {
  		axios.get('http://localhost:3001/api/v1/customers.json')
  		.then(response => {
    		console.log(response)
    		this.setState({customers: response.data})
  		})
  		.catch(error => console.log(error))
	}
	
	handleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

	handleQuery = (e) => {
	    if(e.key === 'Enter'){
	        this.setState({isLoading: true, tweets: []})
	        axios.get('http://localhost:3001/api/v1/customers.json?by_full_name=' + this.state.query)
	        .then(response => {
	          this.setState({customers: response.data})
	        })
	        .catch(error => console.log(error));
	        e.preventDefault();
	    }
	}

	render() {
	   return (
	   	<div>
		   	<form>
	          <input className='input' type="text" size="25"
	            name="query" placeholder="Enter a search text and hit Enter"
	            value={this.state.query} onChange={this.handleInput} onKeyPress={this.handleQuery}/>
	         </form>
	         <br />
	 	      <div>
		         {this.state.customers.map((customer) => {
			        return(
			          <div className="user" key={customer.id} >
				          <table>
					          <tr>
					            <td>{customer.firstname}</td>
					            <td>{customer.lastname}</td>
					          </tr>
				          </table>
			          </div>
			        )       
			      })}
		      </div>
		 </div>
	    )
	 }
}

export default CustomersContainer