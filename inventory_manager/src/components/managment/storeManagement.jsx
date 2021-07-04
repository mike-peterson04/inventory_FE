import React, {Component} from 'react'
import Axios from 'axios'
import Storefront from '../storefront/storefront';

class StoreManagement extends Component{

    constructor(props){
        super(props);
        this.state = {
            managers:'none',
            activeManager:'none',
            renderIndex:'home',
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
        event.preventDefault()
        
        let config = this.props.buildHeader();
        try {
            let newStore = await Axios.post('http://127.0.0.1:8000/api/request/store/0/',store,config)
            if (newStore.status === 200){
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

    sortManagers = (employees) =>{
        
        let managers = employees.filter((employee)=>{
            //this makes the assumption of what the primary key for Store_Managers are in the DB
            if(employee.role === 2){
                return true;
            }
            return false;
        });
        return managers;

    }

    async componentDidMount(){
        let managers = await this.allEmployees();
        managers = this.sortManagers(managers);

        this.setState({
            managers:managers,
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
                'create pending'
            )
        }
        else{
            return("Page is loading")
        }
    }
}
export default StoreManagement;