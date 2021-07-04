import React, {Component} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import RequestWrapper from '../requests/requestWrapper'
import Employee from '../employee/employee'
import StorefrontProducts from './storefront_products';
import ReportManager from './reportManager';

class Storefront extends Component{
    constructor(props){

        super(props);
        this.state = {
            employee:props.Employee,
            renderIndex:'none',
            secondaryIndex:'none',
            assignedProducts:'none',
            store:'none'
        }
    }
    changeView = (event,key,primary=true) => {
        event.preventDefault();
        if(primary)
        {
            event.preventDefault();
            this.setState({renderIndex:key});
        }
        else{
            event.preventDefault();
            this.setState({secondaryIndex:key});
        }
    }

    purge = async(event) =>{
        event.preventDefault();
        this.setState({
            employee:this.props.Employee,
            renderIndex:'home',
            secondaryIndex:'none',
            assignedProducts:'none',
            store:'none'
        })
        this.componentDidMount()

    }

    loadStore = async() =>{
        let config = this.props.buildHeader()
        let store;
        try{
            store = await Axios.get('http://127.0.0.1:8000/api/request/store/'+this.state.employee.id,config)
            if(store.status===200){
                return store.data;
            }

        }
        catch(e){
            console.log(e);
            alert('We were unable to load the information regarding your store')

        }
    }
    myStoreHardware = async(storeId) => {
        
        let config = this.props.buildHeader();
        let products = await Axios.get('http://127.0.0.1:8000/api/request/stock/'+storeId, config)
        return(products.data)  

    }

    updateProduct = async(event, product, key)=>{
        event.preventDefault();
        let config = this.props.buildHeader();
        let statusKey = this.props.structure.status;
        if (key === 'confirm'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'AT_STORE'){
                    return true;
                }
                return false;
            });
        }
        else if (key === 'sold'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'SOLD'){
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
                if (status.name.toUpperCase() === 'RETURNING_FROM_STORE'){
                    return true;
                }
                return false;
            });
        }
        product.status = statusKey[0].id;
        try{
            product = await Axios.put('http://127.0.0.1:8000/api/request/product/'+product.id+'/', product, config)
            if(product.status === 200){
                alert("your product has been updated")
                this.purge(event)
            }
            
        }
        catch(e){
            console.log(e);
            alert("there was a problem updating please contact your DBA")
        }
        

    }

    uploadReport = async(event,report)=>{
        event.preventDefault();
        
        let config = this.props.buildHeader()
        let check
        try {
            check = await Axios.put('http://127.0.0.1:8000/api/request/store/1',report,config)
            if (check.status==200){
                alert("your report has been processed")
                this.componentDidMount()

            }
            
        } catch (error) {
            console.log(error);
            alert("there was an issue with uploading your report")
            
        }


    }


    async componentDidMount(){
        
        let store = await this.loadStore()
        let stock = await this.myStoreHardware(store.id)
        this.setState({
            store:store,
            assignedProducts:stock,
            renderIndex:'home'
        })

    }

    render(){
        
        if(this.state.renderIndex === 'home'){
            return(
                <div>
                    <button className='btn btn-secondary' onClick={(e)=>this.changeView(e,'self')}>For Myself</button><br/>
                    <button className='btn btn-warning' onClick={(e)=>this.changeView(e,'store')}>For My Store</button>
                </div>
            )
        }
        else if(this.state.renderIndex ==='self'){
            return (<Employee buildHeader={this.props.buildHeader} employee={this.state.employee} structure={this.props.structure}/>)
        }
        else if(this.state.renderIndex === 'store'){
            if(this.state.secondaryIndex === 'report'){
                return(<ReportManager uploadReport={this.uploadReport}/>)

            }
            else if(this.state.secondaryIndex === 'request'){
                return(<RequestWrapper buildHeader={this.props.buildHeader} purge={this.purge} accessLevel={2} request={this.props.structure.request} employee={this.state.employee} model={this.props.structure.products} status={this.props.structure.status}/>);
            }
            else if(this.state.secondaryIndex === 'stock'){
                return(<StorefrontProducts updateProduct={this.updateProduct} model={this.props.structure.products} status={this.props.structure.status} products={this.state.assignedProducts}/>)
                
            }
            else{
                return(
                    <div>
                    <button className='btn btn-warning' onClick={(e)=>this.changeView(e,'report',false)}>Upload Sales Report</button><br/>
                    <button className='btn btn-warning' onClick={(e)=>this.changeView(e,'stock',false)}>Assigned Stock</button><br/>
                    <button className='btn btn-warning' onClick={(e)=>this.changeView(e,'request',false)}>Request Stock</button><br/>
                    </div>
                );

            }
        }
        else{
            return('Page is loading')
        }

    }
}
export default Storefront;