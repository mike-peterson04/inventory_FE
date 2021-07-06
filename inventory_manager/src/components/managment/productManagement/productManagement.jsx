import React, {Component} from 'react'
import Axios from 'axios'
import InventoryManager from '../../inventoryManager/inventoryManager';
import StatusMaker from  './statusMaker'
import ModelMaker from './modelMaker';
import ReportManager from '../../storefront/reportManager';

class ProductManagement extends Component{
    constructor(props){
        super(props);
        this.state = {
            products:'none',
            renderIndex:'loading',
            model:props.model,
            status:props.status

        }
    }

    uploadReport = async(event,report)=>{
        event.preventDefault();
        
        let config = this.props.buildHeader()
        let check
        try {
            check = await Axios.post('http://127.0.0.1:8000/api/request/bulk/',report,config)
            if (check.status==200){
                alert("your report has been processed")
                this.componentDidMount()

            }
            
        } catch (error) {
            console.log(error);
            alert("there was an issue with uploading your report")
            
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

    changeView = (e,key, primary=true)=>{
        e.preventDefault();
        if(primary){
            this.setState({renderIndex:key});
        }
        else{
            this.setState({secondaryIndex:key});
        }
    }

    async componentDidMount(){
        this.setState({renderIndex:'home'})
    }

    render(){
        
        if(this.state.renderIndex === 'loading'){
            return("Page Loading")
        }
        else if(this.state.renderIndex === 'home'){
            return(
                <div>
                    <button className='btn btn-danger' onClick={(e)=>{this.changeView(e,'new')}}>Add New Items to DB</button><br/>
                    <button className='btn btn-danger' onClick={(e)=>{this.changeView(e,'model')}}>Create new Product Model</button><br/>
                    <button className='btn btn-danger' onClick={(e)=>{this.changeView(e,'inventory')}}>Inventory Management</button><br/>
                    <button className='btn btn-danger' onClick={(e)=>{this.changeView(e,'status')}}>Create New Product Status</button><br/>
                </div>
            )
        }
        else if(this.state.renderIndex === 'new'){
            return(
                <div>
                    <ReportManager uploadReport={this.uploadReport}/>
                </div>
            )
        }
        else if(this.state.renderIndex === 'model'){
            return(
                <div>
                    <ModelMaker buildHeader={this.props.buildHeader} purge={this.props.purge}/>
                </div>
            )
        }
        else if(this.state.renderIndex === 'inventory'){
            return(
                <div>
                        <InventoryManager buildHeader={this.props.buildHeader} purge={this.props.purge} status={this.state.status} buildHeader={this.props.buildHeader} model={this.state.model}/>
                </div>
            )
        }
        else if(this.state.renderIndex === 'status'){
            return(
                <div>
                    <StatusMaker buildHeader={this.props.buildHeader} purge={this.props.purge}/>
                </div>
            )
        }
    }
}
export default ProductManagement