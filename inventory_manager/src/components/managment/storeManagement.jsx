import React, {Component} from 'react'
import Axios from 'axios'
import Storefront from '../storefront/storefront';
import StoreMaker from './storeMaker';

class StoreManagement extends Component{

    constructor(props){
        super(props);
        this.state = {
            managers:'none',
            activeManager:'none',
            renderIndex:'none',
            secondaryIndex:'none'
        }
    }

    changeView = (event, key, primary=true) =>{
        event.preventDefault()
        if(primary){
            this.setState({renderIndex:key})
        }
        else{
            this.setState({secondaryIndex:key})
        }

    }

    optionMap = (item) =>{
        return(<option value={item.id}>{item.name}: id:{item.id}</option>)

    }

    setActiveManager = (managerId) =>{
        
        let manager = this.state.managers.filter((person)=>{
            if (person.id == managerId){
                return true;
            }
            return false;
        })
        this.setState(
            {
                secondaryIndex:'impersonate',
                activeManager:manager[0]
            }
        )

    }

    createStore = async(event, store) =>{
        debugger;
        event.preventDefault()
        
        let config = this.props.buildHeader();
        try {
            let newStore = await Axios.post('http://127.0.0.1:8000/api/request/store/0',store,config)
            if (newStore.status === 201){
                alert('new store has been created')
                this.props.purge()
            }
            
        } catch (error) {
            console.log(error);
            alert('we were unable to process your request')
        }
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

    availableManagers = async(employees) =>{
        let managers = this.sortManagers(employees);
        let stores = await this.currentStores();

        managers = managers.filter((manager)=>{
            for(let i=0;i<stores.length;i++){
                if (stores[i].manager === manager.id){
                    return false
                }

            }
            return true
        })
        return managers



    }

    currentStores = async() =>{
        try {
            let stores = await Axios.get('http://127.0.0.1:8000/api/request/store/0',this.props.buildHeader());
            if (stores.status === 200){
                return stores.data;
            }
            
        } catch (error) {
            alert('unable to reach api please try again')
            
        }
    }

    sortManagers = (employees) =>{
        
        let managers = employees.filter((employee)=>{
            //this makes the assumption of what the primary key for Store_Managers are in the DB
            if(employee.role === 2){
                return true;
            }
            return false;
        });
        if (managers.length>0)
        {return managers;}
        alert('there are no unassigned store managers so store creation is not currently supported please promote store manager')

    }

    async componentDidMount(){
        let employees = await this.allEmployees();
        let managers = this.sortManagers(employees);
        let availableManagers = await this.availableManagers(employees)
        debugger;

        this.setState({
            employees:employees,
            managers:managers,
            available:availableManagers,
            renderIndex:'home'
        })
    }

    render(){
        
        if(this.state.renderIndex === 'home'){
            return(

                <div>
                    <button className='btn btn-danger' onClick={(e)=>{this.changeView(e,'create')}}>Create Store</button>
                    <button className='btn btn-danger' onClick={(e)=>{this.changeView(e,'store')}}>File request for store</button>
                </div>
            )
        }
        else if(this.state.renderIndex === 'store'){
            if(this.state.secondaryIndex === 'none'){
                return(
                    <select className='btn btn-danger' value={this.state.activeManager} onChange={(e)=> this.setActiveManager(e.target.value)}>
                    <option value={0}>None</option>
                    {this.state.managers.map(this.optionMap)}
                    </select>
                )
            }
            else if (this.state.secondaryIndex === 'impersonate'){
                return(
                    <Storefront buildHeader={this.props.buildHeader} Employee={this.state.activeManager} structure={this.props.structure}/>
                )
            }
        }
        else if(this.state.renderIndex === 'create'){
            return(
                <StoreMaker managers={this.state.available} createStore={this.createStore}/>
            )
        }
        else{
            return("Page is loading")
        }
    }
}
export default StoreManagement;