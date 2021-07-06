import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import MakeRequest from './makeRequest';
import ViewRequest from './viewRequest'

class RequestWrapper extends Component{
    constructor(props){
        super(props);
        this.state={
            accessLevel:props.accessLevel,
            renderIndex:'home',
            approvedRequests:'none',
            employee:props.employee,
            request:{
                id:'New',
                quantity:0,
                priority:5,
                justification:'Why do you need this?',
                employee:props.employee.id,
                product:null,
                type:null
            }
        }
    }
    createRequest = async(event,request)=>{
        event.preventDefault();
    }
    getMyActiveRequests = async(event,request)=>{
        event.preventDefault()
    }
    setIndex=(event,key)=>{
        event.preventDefault();
        this.setState({renderIndex:key})
    }
    getProducts = async() => {
        let config = this.props.buildHeader();
        let products;
        try {
            products = await Axios.get('http://127.0.0.1:8000/api/request/product',config)
            if (products.status===200){
                return products.data
            }
            
        } catch (error) {
            console.log(error);
            alert('there was a problem loading your page info please try again')
            
        }
    }
    async componentDidMount(){
        let filteredRequestType = this.props.request.filter((type)=>{
            if(type.access <= this.state.accessLevel){
                if(type.access==2 && this.state.accessLevel > 2){
                    return false;
                }
                return true;
            }
            return false;
        })
        let products = await this.getProducts()
        this.setState({approvedRequests:filteredRequestType, products:products})
    }
    render(){
        if(this.state.renderIndex === 'home'){
            if(this.state.accessLevel === 1){
                return(
                    <div>
                        <button className='btn btn-secondary' onClick={(e)=>this.setIndex(e,'create')}>Make Request</button><br/>
                        <button className='btn btn-secondary' onClick={(e)=>this.props.purge(e)}>Go Back</button><br/>
                    </div>
                )
            }
            else if(this.state.accessLevel === 2){
                return(
                    <div>
                        <button className='btn btn-warning' onClick={(e)=>this.setIndex(e,'create')}>Make Request</button><br/>
                    </div>
                )
            }
            else if(this.state.accessLevel === 3){
                return(
                    <div>
                        <button className='btn btn-dark' onClick={(e)=>this.setIndex(e,'view')}>Open Requests</button><br/>
                        <button className='btn btn-dark' onClick={(e)=>this.setIndex(e,'create')}>Make New Request</button><br/>
                    </div>
                )
            }
        }
        if(this.state.renderIndex === 'create'){
            return(
                <MakeRequest buildHeader={this.props.buildHeader} purge={this.props.purge} employee={this.state.employee.id} type={this.state.approvedRequests} model={this.props.model}/>
            )
        }
        if(this.state.renderIndex === 'view'){
            return(
                <ViewRequest accessLevel={this.state.employee.type} type={this.props.request} status={this.props.status} products={this.state.products} buildHeader={this.props.buildHeader} purge={this.props.purge} employee={this.state.employee} type={this.state.approvedRequests} model={this.props.model}/>
            )
        }
    }
}
export default RequestWrapper;