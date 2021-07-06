import React, {Component} from 'react';
import Axios from 'axios';
import Receiving from './receiving';
import ReportManager from '../storefront/reportManager';
import EditSelector from './editSelector';

class InventoryManager extends Component{
    constructor(props){
        super(props);
        this.state={
            renderIndex:'none',
             products:'none',
             status:props.status
        }

    }

    updateProduct = async(event, product, key='')=>{
        
        event.preventDefault();
        let config = this.props.buildHeader();
        let statusKey = this.state.status;
        if (key === 'confirm'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'IN_STOCK'){
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
        else if (key === 'not'){
            statusKey = statusKey.filter((status)=>{
                if (status.name.toUpperCase() === 'NOT_RETURNED'){
                    return true;
                }
                return false;
            });
        }
        else{
            statusKey = [{id:product.status},{id:product.status}]
        }
        product.status = statusKey[0].id;
        try{
            product = await Axios.put('http://127.0.0.1:8000/api/request/product/'+product.id+'/', product, config)
            if(product.status === 200){
                alert("your product has been updated")
                this.componentDidMount()
            }
            
        }
        catch(e){
            console.log(e);
            alert("there was a problem updating please contact your DBA")
        }
        

    }

    getProducts = async() =>{
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

    getStores = async () =>{
        let config = this.props.buildHeader();
        let stores;
        try {
            stores = await Axios.get('http://127.0.0.1:8000/api/request/store/0',config)
            if (stores.status===200){
                return stores.data
            }
            
        } catch (error) {
            console.log(error);
            alert('there was a problem loading your page info please try again')
        }

    }

    productFilter = (products,type) =>{
        let status
        if(type==='stock'){
            status = this.state.status.filter((productState)=>{
                if(productState.available){
                    return true;
                }
                return false;
            });

        }
        else if(type==='validate'){
            status = this.state.status.filter((productState)=>{
                if(productState.returning){
                    return true;
                }
                return false;

            });

        }
        let result = products.filter((product)=>{
            
            for(let i = 0;i<status.length;i++){
                if(product.status===status[i].id){
                    return true;
                }
            }
            
            return false;

        });

        return result
    }


    async componentDidMount(){
        let products = await this.getProducts();
        let available = this.productFilter(products,'stock');
        let returning = this.productFilter(products, 'validate');
        let employees = await this.allEmployees();
        let stores = await this.getStores();
        

        this.setState({
            products:products,
            inInventory:available,
            returningProduct:returning,
            currentEmployees:employees,
            supportedStores:stores,
            renderIndex:'home',
            secondaryIndex:'none'
        });


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

    render(){
        
        if(this.state.renderIndex==='home'){
            return(
            <div>
                <button className='btn btn-dark' onClick={(e)=>{this.changeView(e,'restock')}}>Returning items</button><br/>
                <button className='btn btn-dark' onClick={(e)=>{this.changeView(e,"fullfillment")}}>Assign Products(Fullfillment)</button>
            </div>)
        }
        else if(this.state.renderIndex === 'restock'){
            return(
                <Receiving model={this.props.model} status={this.state.status} updateProduct={this.updateProduct} products={this.state.returningProduct}/>
            );
        }
        else if(this.state.renderIndex === 'fullfillment'){
            if(this.state.secondaryIndex === 'bulk'){
                return(
                <div><ReportManager uploadReport={this.uploadReport}/></div>
            );
            }
            else if(this.state.secondaryIndex === 'single'){
                return(
                <div><EditSelector update={this.updateProduct} stores={this.state.supportedStores} products={this.state.products} model={this.props.model} status={this.state.status}/></div>
            );
            }
            else{
                return(
                <div>
                    <button className='btn btn-dark' onClick={(e)=>{this.changeView(e,"bulk",false)}}>Upload CSV for bulk updates</button><br/>
                    <button className='btn btn-dark' onClick={(e)=>{this.changeView(e,"single",false)}}>Update individual product</button>
                </div>
            );
            }
        }
        else{
            return("Page is loading")
        }
    }
}
export default InventoryManager;