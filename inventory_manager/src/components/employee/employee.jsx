import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeProducts from './employee_products'
import RequestWrapper from '../requests/requestWrapper'

class Employee extends Component{
    constructor(props){

        super(props);
        this.state = {
            employee:props.employee,
            renderIndex:'home',
            assignedProducts:'none'
        }
    }

    purge = async(event) =>{
        event.preventDefault();
        this.setState({
            employee:this.props.employee,
            renderIndex:'home',
            assignedProducts:await this.myHardware()
        })
    }

    changeView = (event,key) => {
        event.preventDefault();
        this.setState({renderIndex:key})
    }

    updateProduct = async(event, product, key)=>{
        event.preventDefault();
        
        let config = this.props.buildHeader();
        let statusKey = this.props.structure.status;
        if (key === 'confirm'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'CHECKED_OUT'){
                    return true;
                }
                return false;
            });
        }
        else if (key === 'return'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'PENDING_CHECK_IN'){
                    return true;
                }
                return false;
            });
        }
        else if (key === 'lost'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'LOST_BROKEN'){
                    return true;
                }
                return false;
            });
        }
        else{
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'CHECKED_OUT'){
                    return true;
                }
                return false;
            });
        }
        product.status = statusKey[0].id;
        try{
            product = await Axios.put('http://127.0.0.1:8000/api/request/product/'+product.id+'/', product, config)
            if(product.status === 200){
                this.componentDidMount()
            }
            
        }
        catch(e){
            console.log(e);
            alert("there was a problem updating please contact your DBA")
        }
        

    }

    myHardware = async() => {
        
        let config = this.props.buildHeader();
        let products = await Axios.get('http://127.0.0.1:8000/api/request/myproducts/'+this.state.employee.id, config)
        return(products.data)  

    }
    async componentDidMount(){
        let products = await this.myHardware()
        this.setState({assignedProducts:products})
    }

    render(){
        
        console.log('rendering', this.state.renderIndex)
        if(this.state.renderIndex === 'home'){
            return(
                <div>
                    <button className='btn btn-secondary' onClick={(e)=>this.changeView(e,'products')}>My Products</button><br/>
                    <button className='btn btn-secondary' onClick={(e)=>this.changeView(e,'requests')}>My Requests</button>
                </div>
            )
        }
        else if(this.state.renderIndex === 'products'){
            return <EmployeeProducts updateProduct={this.updateProduct} products={this.state.assignedProducts} model={this.props.structure.products} status={this.props.structure.status}/>;
        }
        else if(this.state.renderIndex === 'requests'){
            return <RequestWrapper buildHeader={this.props.buildHeader} purge={this.purge} accessLevel={1} request={this.props.structure.request} employee={this.state.employee} model={this.props.structure.products} status={this.props.structure.status}/>;
        }

        
    }
}
export default Employee;