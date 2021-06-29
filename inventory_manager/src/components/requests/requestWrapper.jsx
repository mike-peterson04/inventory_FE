import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import MakeRequest from './makeRequest';
// import ViewRequest from ',/ViewRequest';

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
        debugger;
        event.preventDefault();
        this.setState({renderIndex:key})
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
        this.setState({approvedRequests:filteredRequestType})
    }
    render(){
        if(this.state.renderIndex === 'home'){
            if(this.state.accessLevel === 1){
                return(
                    <div>
                        <button className='btn btn-secondary' onClick={(e)=>this.setIndex(e,'view')}>My Open Requests</button><br/>
                        <button className='btn btn-secondary' onClick={(e)=>this.setIndex(e,'create')}>Make Request</button><br/>
                        <button className='btn btn-secondary' onClick={(e)=>this.props.purge(e)}>Go Back</button><br/>
                    </div>
                )
            }
            else if(this.state.accessLevel === 2){
                return(
                    <div>
                        <button className='btn btn-warning' onClick={(e)=>this.setIndex(e,'view')}>My Open Requests</button><br/>
                        <button className='btn btn-warning' onClick={(e)=>this.setIndex(e,'create')}>Make Request</button><br/>
                        <button className='btn btn-warning' onClick={(e)=>this.props.purge(e)}>Go Back</button><br/>
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
    }
}
export default RequestWrapper;