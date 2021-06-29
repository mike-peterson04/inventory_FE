import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Employee from '../employee/employee';
import RequestWrapper from '../requests/requestWrapper';

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
            model:props.structure.product
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

    

    trackedProducts = () =>{
        return true;
    }

    trackedRequests = () =>{
        return true;
    }

    purge = (event)=>{
        this.setState({
            renderIndex:'home',
            secondaryIndex:'none',
            allProducts:'none',
            allRequests:'none',
            employees:'none',
        });
        this.componentDidMount()
    }

    async componentDidMount(){
        let allProducts = await this.trackedProducts()
        let allRequests = await this.trackedRequests()

    }


    render()
    {
     if(this.state.renderIndex === 'home'){
         return(
         <div>
             <button className='btn btn-secondary' onClick={(e)=>this.changeView(e,'self')}>For Myself</button><br/>
             <button className='btn btn-dark' onClick={(e)=>this.changeView(e,'warehouse')}>Warehouse Management</button><br/>

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
                        inventory
                        <button className='btn btn-dark' onClick={(e)=>{this.purge(e)}}>Go Back</button>
                    </div>
                );
            }
            else if(this.state.secondaryIndex==='requests'){
                debugger;
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
