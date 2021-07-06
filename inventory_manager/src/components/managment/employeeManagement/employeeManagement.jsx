
import Axios from 'axios'

function EmployeeManagement(props){
    

    function buildTable(employee){
        return(
        <tr>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{getRole(employee.role).name}</td>
            <td><button className='btn btn-danger' onClick={(e)=>employeeAssignment(e,employee,1)}>Set to Employee</button></td>
            <td><button className='btn btn-danger' onClick={(e)=>employeeAssignment(e,employee,2)}>Set to Store Manager</button></td>
            <td><button className='btn btn-danger' onClick={(e)=>employeeAssignment(e,employee,3)}>Set to Warehouse Employee</button></td>
            <td><button className='btn btn-danger' onClick={(e)=>employeeAssignment(e,employee,4)}>Set to Site Admin</button></td>
        </tr>
        );

    }

   async function employeeAssignment(event,employee,role){
        try {
            let config = props.buildHeader();
            employee.role = role;
            employee = await Axios.put('http://127.0.0.1:8000/api/request/employee/'+employee.id+'/',employee ,config)
            if (employee.status === 200){
                alert('Update Successful reloading employee manager')
                props.purge()
            }
            
        } catch (error) {
            console.log(error)
            alert('We were unable to process your request')
            
        }

    }


    function getRole(roleId)
    {
        
        let result = props.role.filter((role)=>{
            if (role.id === roleId){
                return true;
            }
            return false;
        });
        return result[0]

    }


    return(
        <table>
            <tbody>
                <tr>
                    <th>
                        Employee Id:
                    </th>
                    <th>
                        Employee Name:
                    </th>
                    <th>
                        Current Role:
                    </th>
                    <th>
                        Set To Employee:
                    </th>
                    <th>
                        Set To Store Manager:
                    </th>
                    <th>
                        Set To Warehouse Employee:
                    </th>
                    <th>
                        Set to Site Admin:
                    </th>
                </tr>
                {props.employees.map(buildTable)}
            </tbody>
        </table>

    );
} 
export default EmployeeManagement