import './App.css';
import React, {Component} from 'react';
import LogWrap from '../logWrap/LogWrap'
import Axios from 'axios'
import jwtDecode from 'jwt-decode';
import Employee from '../employee/employee'
import 'bootstrap/dist/css/bootstrap.css';
import Storefront from '../storefront/storefront';
import Warehouse from '../warehouse/warehouse'
import Management from '../managment/management';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      employeeRole:"no data",
      roles:"no data",
      activeUser:"none",
      activeStructure:'none',
      renderIndex:'init'
    }
  }


  getModels = async() =>{
    try {
      let seed = await Axios.get('http://127.0.0.1:8000/api/request/initial')
      return seed.data
      
    } catch (error) {
      console.log(error)
      alert("there was an error with getting basic information from the database please confirm your site has been properly setup")
      
    }

  }

  async componentDidMount(){
    let pageseed = await this.getModels();
    this.setState({activeStructure:pageseed,renderIndex:'seeded'})
  }


  registerUser = async(user) =>{
    let newUser = {
      username:user.UserName,
      password:user.Password,
      password2:user.Password,
      email:user.Email
    }
    let newEmployee = 'null'
    try{
      newUser = await Axios.post('http://127.0.0.1:8000/api/request/register/', newUser);
      newEmployee = {
        name:user.Name,
        email:user.Email,
        user:0,
        role:1
      }
      if(newUser.status === 201){
        this.loginUser({username:user.UserName,password:user.Password},true ,newEmployee)
    
    }
    
      
    }
    catch(e){
      console.log(e," ", newUser, " ", newEmployee)
    }

    
  }


  loginUser = async(userLogin, create=false, user={name:"null"}) =>  {
    try{
      let data = await Axios.post('http://127.0.0.1:8000/api/token/', userLogin);
      console.log('Logged in User', data);
      localStorage.setItem('token', data.data.access);
      //checking to see if loginUser was called from user registration
      if(create){
        let userInfo = jwtDecode(data.data.access)
        if (user.name === 'null'){
          alert("There was a problem processing login please try again");
        }
        else{
          user.user = userInfo.user_id
          user = await Axios.post('http://127.0.0.1:8000/api/request/initial/',user)
        }

      }
      this.confirmAccess();
      
      }
      catch{
        alert('username or password incorrect')
      }
    }

    buildHeader = () =>{
      let token = localStorage.getItem('token');
      let config = {headers: { Authorization: `Bearer ${token}` }};
      return config;
  }

    confirmAccess = async()=> {
      let token = localStorage.getItem('token');
      let config = {headers: { Authorization: `Bearer ${token}` }};
      //Database MUST have the following role.name values ['Employee', 'Manager','Store_Manager','Warehouse_Employee']
      let roles = await Axios.get('http://127.0.0.1:8000/api/request/role',config);
      let employees = await Axios.get('http://127.0.0.1:8000/api/request/employee', config);
      token = jwtDecode(token)
      employees = employees.data.filter((employee)=>{
        if(employee.user===token.user_id){
          return true;
        }
        return false;
      }); 
      if (employees.length !== 1){
        this.setState({
          activeUser:token.user_id,
          employeeRole:"no",
          roles:roles.data
        })
      }
      else{
        roles = roles.data.filter((role)=>{
          if(role.id === employees[0].role){
            return true;
          }
          return false;
        });
        this.setState({
          activeUser:token.user_id,
          employeeRole:roles[0].name,
          employee:employees[0]
        })
      }

    }


  render(){
    if(this.state.employeeRole === "no data"){
      return (
        <div className="container-fluid col-md-8 vertical-center">
          <div className="row">
          <div className="col-sm">

          </div>
            <div className="col-sm">
              <h1 align='center'>Welcome to Company XYZ Product Management Suite</h1>
              <center><LogWrap loginUser={this.loginUser} registerUser={this.registerUser}/></center>
            </div>
            <div className="col-sm">
            
          </div>
          </div>
        </div>
      );
    }
    else if(this.state.employeeRole === 'no'){
      return (
          <div className="App">
            Under Construction
          </div>
        );
    }
    //employee function
    else if(this.state.employeeRole === 'Employee'){
      return(
            <Employee buildHeader={this.buildHeader}  employee={this.state.employee} structure={this.state.activeStructure}/>
      )
    }
    else if(this.state.employeeRole === 'Store_Manager'){
      return (
        <div className="container-fluid col-md-8 vertical-center">
          <div className="row">
          <div className="col-sm">

          </div>
            <div className="col-sm">
            <Storefront buildHeader={this.buildHeader} Employee={this.state.employee} structure={this.state.activeStructure}/>

            </div>
            <div className="col-sm">
            
          </div>
          </div>
        </div>
        );

    }
    //Warehouse employee
    else if(this.state.employeeRole === 'Warehouse_Employee'){
      return (
            <Warehouse buildHeader={this.buildHeader} employee={this.state.employee} structure={this.state.activeStructure}/>
        );

    }
    else if(this.state.employeeRole === 'Manager'){
      return (
        <div className="container-fluid col-md-8 vertical-center">
          <div className="row">
          <div className="col-sm">

          </div>
            <div className="col-sm">
            <Management buildHeader={this.buildHeader} employee={this.state.employee} structure={this.state.activeStructure}/>

            </div>
            <div className="col-sm">
            
          </div>
          </div>
        </div>
        );

    }
  }
}

export default App;
