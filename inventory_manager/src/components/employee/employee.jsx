import React, {Component} from 'react';
import Axios from 'axios';

class Employee extends Component{
    constructor(props){

        super(props);
        this.state = {
            employee:props.Employee,
            renderIndex:'home',
            assignedProducts:'none'
        }
    }

    myHardware = async() => {
        let token = localStorage.getItem('token')
        let config = {headers: { Authorization: `Bearer ${token}` }};
        debugger;
        let products = await Axios.get('http://127.0.0.1:8000/api/request/myproducts/'+this.state.employee.id, config)
        return(products.data)  

    }
    componentDidMount(){
        let products = this.myHardware()
    }

    render(){

        return(
            <div>
                another something else
            </div>
        )
    }
}
export default Employee;