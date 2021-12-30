import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Employee from '../employee/employee';
import RequestWrapper from '../requests/requestWrapper';
import InventoryManager from '../inventoryManager/inventoryManager';
import Navbar from '../navbar/navbar';

class Warehouse extends Component{
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
             <Navbar caller='warehouse' changeView={this.changeView}/>

         </div>)
     }
     else if(this.state.renderIndex === 'self'){
         return(
            <div><Employee buildHeader={this.props.buildHeader} employee={this.state.employee} structure={this.props.structure}/>
            <button className='btn btn-dark' onClick={(e)=>{this.purge(e)}}>Go Back</button>
            </div>
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
    }
}
export default Warehouse;
