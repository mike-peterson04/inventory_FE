import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Employee from '../employee/employee';
import RequestWrapper from '../requests/requestWrapper';
import InventoryManager from '../inventoryManager/inventoryManager';
import StoreManagement from './storeManagement/storeManagement';
import EmployeeManagement from './employeeManagement/employeeManagement';

class Management extends Component{
    constructor(props){

        super(props);
        this.state = {
            employee:props.employee,
            renderIndex:'none',
            secondaryIndex:'none',
            allProducts:'none',
            allRequests:'none',
            employees:'none',
            status:props.structure.status,
            requestType:props.structure.request,
            model:props.structure.products
        }
    }

    allEmployees = async() =>{
        try {
            
            let employees = await Axios.get('http://127.0.0.1:8000/api/request/employee/',this.props.buildHeader());
            if (employees.status === 200){
                return employees.data
            }
            
        } catch (error) {
            console.log(error);
            alert('there was a problem loading your page info please try again')  
        }
    }

    changeView = (e,key, primary=true)=>{
        e.preventDefault();
        if(primary){
            this.setState({renderIndex:key});
        }
        else{
            this.setState({secondaryIndex:key});
        }
    }

    getRoles = async() =>{
        try {
            let config = this.props.buildHeader()
            let result = await Axios.get('http://127.0.0.1:8000/api/request/role/',config)
            if (result.status = 200){
                return result.data
            }
            
        } catch (error) {
            alert('problem with loading page please try again')
            
        }
    }

    

    purge = (event)=>{
        this.setState({
            renderIndex:'none',
            secondaryIndex:'none',
            allProducts:'none',
            allRequests:'none',
            employees:'none',
        });
        this.componentDidMount()
    }

    async componentDidMount(){
        let employees = await this.allEmployees()
        let roles = await this.getRoles()
        this.setState({
            employees:employees,
            roles:roles,
            renderIndex:'home'

        });
    }



    render()
    {
     if(this.state.renderIndex === 'home'){
         return(
         <div>
             <button className='btn btn-secondary' onClick={(e)=>this.changeView(e,'self')}>For Myself</button><br/>
             <button className='btn btn-dark' onClick={(e)=>this.changeView(e,'warehouse')}>Warehouse Management</button><br/>
             <button className='btn btn-danger' onClick={(e)=>this.changeView(e,'product')}>Product Management</button><br/>
             <button className='btn btn-danger' onClick={(e)=>this.changeView(e,'employee')}>Employee Management</button><br/>
             <button className='btn btn-danger' onClick={(e)=>this.changeView(e,'store')}>Store Management</button><br/>

         </div>)
     }
     else if(this.state.renderIndex === 'self'){
         return(
            <Employee buildHeader={this.props.buildHeader} employee={this.state.employee} structure={this.props.structure}/>
         );
     }
     else if(this.state.renderIndex === 'warehouse'){
            if(this.state.secondaryIndex === 'inventory'){
                return(
                    <div>
                        <InventoryManager allEmployees={this.allEmployees} buildHeader={this.props.buildHeader} purge={this.purge} status={this.state.status} buildHeader={this.props.buildHeader} model={this.state.model}/>
                        <button className='btn btn-dark' onClick={(e)=>{this.purge(e)}}>Go Back</button>
                    </div>
                );
            }
            else if(this.state.secondaryIndex==='requests'){
                return(
                    <div>
                        <RequestWrapper buildHeader={this.props.buildHeader} purge={this.purge} accessLevel={3} request={this.props.structure.request} employee={this.state.employee} model={this.props.structure.products} status={this.props.structure.status}/>
                        <button className='btn btn-dark' onClick={(e)=>{this.purge(e)}}>Go Back</button>
                    </div>
                );
            }
            else {
                return(
                    <div>
                        <button className='btn btn-dark'onClick={(e)=>this.changeView(e,'inventory',false)}>Manage Inventory</button><br/>
                        <button className='btn btn-dark'onClick={(e)=>this.changeView(e,'requests',false)}>Manage Requests</button><br/>
                        <button className='btn btn-dark' onClick={(e)=>{this.purge(e)}}>Go Back</button>
                    </div>

                );
            }
    }
    else if(this.state.renderIndex === 'product'){
        return(
        <div>
            
            <button className='btn btn-danger' onClick={(e)=>{this.purge(e)}}>Go Back</button>
        </div>)
    }  
    else if(this.state.renderIndex === 'employee'){
        return(
            <div>
                <EmployeeManagement purge={this.purge} role={this.state.roles}employees={this.state.employees} buildHeader={this.props.buildHeader} />
                <button className='btn btn-danger' onClick={(e)=>{this.purge(e)}}>Go Back</button>
            </div>
        )
    }
    else if(this.state.renderIndex=== 'store'){
        return(
        <div>
            <StoreManagement buildHeader={this.props.buildHeader} structure={this.props.structure}/>
            <button className='btn btn-danger' onClick={(e)=>{this.purge(e)}}>Go Back</button>
        </div>)
    } 
    else{
        return(
            <div>
                Page is Loading
            </div>)
    }
    }
}
export default Management;
