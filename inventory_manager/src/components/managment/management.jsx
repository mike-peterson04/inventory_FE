import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Employee from '../employee/employee';
import RequestWrapper from '../requests/requestWrapper';
import InventoryManager from '../inventoryManager/inventoryManager';
import StoreManagement from './storeManagement';

class Management extends Component{
    constructor(props){

        super(props);
        this.state = {
            employee:props.employee,
            renderIndex:'home',
            secondaryIndex:'none',
            allProducts:'none',
            allRequests:'none',
            employees:'none',
            status:props.structure.status,
            requestType:props.structure.request,
            model:props.structure.products
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

    

    purge = (event)=>{
        this.setState({
            renderIndex:'home',
            secondaryIndex:'none',
            allProducts:'none',
            allRequests:'none',
            employees:'none',
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
                        <InventoryManager buildHeader={this.props.buildHeader} purge={this.purge} status={this.state.status} buildHeader={this.props.buildHeader} model={this.state.model}/>
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
        return(<button className='btn btn-danger' onClick={(e)=>{this.purge(e)}}>Go Back</button>)
    }  
    else if(this.state.renderIndex === 'employee'){
        return(<button className='btn btn-danger' onClick={(e)=>{this.purge(e)}}>Go Back</button>)
    }
    else if(this.state.renderIndex=== 'store'){
        return(
        <div>
            <StoreManagement buildHeader={this.props.buildHeader} structure={this.props.structure}/>
            <button className='btn btn-danger' onClick={(e)=>{this.purge(e)}}>Go Back</button>
        </div>)
    } 
    }
}
export default Management;