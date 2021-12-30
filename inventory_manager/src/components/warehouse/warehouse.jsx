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

    changeView = (e, primary, key=this.state.secondaryIndex)=>{
        e.preventDefault();
        this.setState({
            renderIndex:primary,
            secondaryIndex:key
        })
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
        debugger;
        
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
                        <Navbar caller='warehouse' changeView={this.changeView}/>
                        <div className="container-fluid col-md-8 vertical-center">
                            <div className="row">
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">
                                <center><InventoryManager buildHeader={this.props.buildHeader} purge={this.purge} status={this.state.status} buildHeader={this.props.buildHeader} model={this.state.model}/></center>
                                </div>
                                <div className="col-sm">
            
                                </div>
                            </div>
                        </div>
                        
                    </div>
                );
            }
            else if(this.state.secondaryIndex==='requests'){
                return(
                    <div>
                        <Navbar caller='warehouse' changeView={this.changeView}/>
                        <div className="container-fluid col-md-8 vertical-center">
                            <div className="row">
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">
                                <RequestWrapper buildHeader={this.props.buildHeader} purge={this.purge} accessLevel={3} request={this.props.structure.request} employee={this.state.employee} model={this.props.structure.products} status={this.props.structure.status}/>
                                </div>
                                <div className="col-sm">
            
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                );
            }
            else {
                return(
                    <div>
                        <Navbar caller='warehouse' changeView={this.changeView}/>
                        <div className="container-fluid col-md-8 vertical-center">
                            <div className="row">
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">
                                    <button className='btn btn-dark'onClick={(e)=>this.changeView(e,'inventory',false)}>Manage Inventory</button><br/>
                                    <button className='btn btn-dark'onClick={(e)=>this.changeView(e,'requests',false)}>Manage Requests</button><br/>

                                </div>
                                <div className="col-sm">
            
                                </div>
                            </div>
                        </div>
                        
                    </div>

                );
            }
    }   
    }
}
export default Warehouse;
