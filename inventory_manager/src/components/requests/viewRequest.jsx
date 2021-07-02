import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class ViewRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            requests:'none',
            accessLevel:props.access,
            products:props.products,
            employeeProducts:'none',
            retailProducts:'none',
            employeeBreakdown:'none',
            retailBreakdown:'none',
            status:'none',
            requestType:'none',
            activeRequests:[],
            model:'none'
        }
    }

    showQuantity = (id, internal) =>{
        let total = -1;
        if(internal){
            this.state.employeeBreakdown.forEach(item =>{
                    if (item.id === id){
                        total = item.amount;
                    }
                });
        }
        else{
            this.state.retailBreakdown.forEach(item =>{
                if (item.id === id){
                    total = item.amount;
                }
            });
        }
        if(total === -1){
            total = 0;
        }
        return total
    }

    getModel(modelId){ 

        let result = this.state.model.filter((model)=>{
            if (model.id == modelId){
                return true;
            }
            return false;
        });
        return result[0].name
    
    }
    
    getStatus(statusId){
        let result = this.props.status.filter((status)=>{
            if (status.id == statusId){
                return true;
            }
            return false;
        });
        return result[0].name
    
    }

    assignProduct = async()=>{

    }

    getRequest = async() =>{
        let config = this.props.buildHeader();
        try {
            let requests = await Axios.get("http://127.0.0.1:8000/api/request/", config)
            return requests.data;
            
        } catch (error) {
            console.log(error);
            alert('We were unable to build the page please check with your DBA')
            
        }


    }

    parseAvailable = (internal) =>{
        
        let result
        if (internal){
            result = this.state.products.filter((product)=>{
                if (product.employee_unit){
                    if(this.getStatus(product.status)==="In_Stock"){
                        return true;
                    }
                }
                return false;

            });


        }
        else{

            result = this.state.products.filter((product)=>{
                if (!product.employee_unit){
                    if(this.getStatus(product.status)==="In_Stock"){
                        return true;
                    }
                }
                return false;

            });

        }
        return result;
    }

    stockCounter = (products) =>{
        let models = [];
        let result =[];
        let count = 0;
        for(let i=1;i<=this.state.model.length;i++){
            models.push(i)
        }
        for(let i=0;i<models.length;i++){
            products.forEach((product)=>{
                if (product.model === models[i]){
                    count++
                }
            });
            
            
            result.push({id:models[i],amount:count})
            
        } 
        return result;


    }
    
    approveRequest = async(event, request , approval) =>{
        
        event.preventDefault();
        request.approval = approval;
        let config = this.props.buildHeader();
        try {
           request = await Axios.put('http://127.0.0.1:8000/api/request/modify/'+request.id+'/',{value:approval},config)
            if (request.status === 200){
                alert("Request updated successfully")
                
                this.redraw()
            }
            
        } catch (error) {
            alert('there was a problem updating the request')
            
        }

        

    }
    redraw = () =>{
        this.setState({renderIndex:false})
        this.componentDidMount()
    }

    buildTable=(request)=>{
        let model;
        let requestType = this.requestType(request.type)
        let access = this.validateAccess(this.props.employee.role, requestType)
        if (request.product !== null){
            model = this.getModel(request.product);
        }
        if(request.approval !== false&&!request.completed)
        {
            if(this.props.employee.role < 3){
                return('this')
            }
                return(
                    <React.Fragment>
                        <tr>
                            <td>Requestor Id:</td>
                            <td>{request.employee}</td>
                            <td>Request Type:</td>
                            <td>{requestType.name}</td>
                        </tr>
                        {request.product !== null&&<tr>
                            <td>Product Type:</td>
                            <td>{model}</td>
                            <td>Product Quantity:</td>
                            <td>{request.quantity}:({requestType.name === 'Employee_Product'?this.showQuantity(request.product,true):this.showQuantity(request.product,false)} available)</td>
                        </tr>}
                        <tr>
                            <td>Approval:</td>
                            <td>{request.approval&&'Approved'}{request.approval!==true&&"Waiting for Approval"}</td>
                            {this.props.employee.role ===4&&<React.Fragment><td><button className='btn btn-danger' onClick={(e)=>this.approveRequest(e,request,true)}>Approve Request</button></td>
                            <td><button className='btn btn-danger' onClick={(e)=>this.approveRequest(e,request,false)}>Deny Request</button></td></React.Fragment>}
                            {this.props.employee.role===3&&<React.Fragment><td>{request.approval!==true&&<React.Fragment>{access&&<button className='btn btn-dark' onClick={(e)=>this.approveRequest(e,request,true)}>Approve Request</button>}</React.Fragment>}</td>
                            <td>{request.approval!==true&&<React.Fragment>{access&&<button className='btn btn-dark' onClick={(e)=>this.approveRequest(e,request,false)} >Deny Request</button>}</React.Fragment>}</td></React.Fragment>}

                        </tr>
                        <tr>
                            <td colSpan='3'>{request.justification}<hr width='80%' align='center'/></td>
                            <td>{request.approval&&<button className='btn btn-dark'>Mark Complete</button>}</td>
                        </tr>
                </React.Fragment>
            );
        }
    }


    getDetails = async() =>{
        try {
          let seed = await Axios.get('http://127.0.0.1:8000/api/request/initial')
          return seed.data
          
        } catch (error) {
          console.log(error)
          alert("there was an error with getting basic information from the database please confirm your site has been properly setup")
          
        }
    
      }

    async componentDidMount(){
        
        let internal = this.parseAvailable(true);
        let retail = this.parseAvailable(false);
        let employeeBreakdown = this.stockCounter(internal);
        let retailBreakdown = this.stockCounter(retail);
        let requests = await this.getRequest();
        let structure = await this.getDetails()
        
        this.setState(
            {employeeBreakdown:employeeBreakdown,
            employeeProducts:internal,
            retailProducts:retail,
            retailBreakdown:retailBreakdown,
            activeRequests:requests,
            model:structure.products,
            status:structure.status,
            requestType:structure.request,
            renderIndex:true
            });

        

    }

    requestType=(typeId)=>{
        if (typeId === 3){
        }
        let result = this.state.requestType.filter((type)=>{
            if (type.id == typeId){
                return true;
            }
            return false;
        });
        return result[0]

    }

    validateAccess = (accessLevel,type)=>{ 
        if (accessLevel > 3){
            return true;
        }
        
        if (type.name !== 'Access'&& accessLevel === 3 && type.access === 1){
            return true;
        }
        return false;

    
    }

    render(){
        if(!this.state.renderIndex){
            return('pageLoading')
        }
        else{
            return(
                <table className='table table-striped'>
                    <tbody>
                        {this.state.activeRequests.length>0&&this.state.activeRequests.map(this.buildTable)}
                    </tbody>
                </table>
        );}
    }
}
export default ViewRequest;