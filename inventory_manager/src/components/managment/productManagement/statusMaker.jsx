import {useState} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const StatusMaker = (props) =>{
    
    
    
    const [name, setName] = useState('New Status');
    const [available, setAvailable] = useState(0);
    const [returning, setReturning] = useState(0);

    async function createStatus(event, status){
        event.preventDefault();
        if(status.available === 0){
            status.available = false;
        }
        else{
            status.available = true;
        }
        if(status.returning === 0){
            status.returning = false;
        }
        else{
            status.returning = true;
        }
        let config = props.buildHeader()
        try {
            let result = await Axios.post('http://127.0.0.1:8000/api/request/status/',status,config)
            if (result.status===201){
                props.purge()
            }

            
        } catch (error) {
            alert("there was a problem creating your status")
        }
        

    }    

    return(
        <div className='CreateStatus'>
            <form onSubmit={(e)=>createStatus(e, {name:name,available:available
            ,returning:returning})}>
                <table>
                    <tbody>
                    <tr>
                            <td>
                                <label>Status Name:</label>
                            </td>
                            <td>
                                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}></input>
                            </td>

                        </tr>
                        <tr>
                            <td><label>Status Availability:</label></td>
                            <td>
                                <select value={available} onChange={(e)=> setAvailable(e.target.value)}>
                                <option value='0'>Cannot be Distributed</option>
                                <option value='1'>Able to be Distributed</option>
                                    
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Status Availability:</label></td>
                            <td>
                                <select value={returning} onChange={(e)=> setReturning(e.target.value)}>
                                <option value='0'>Not in transit to warehouse</option>
                                <option value='1'>In Transit to warehouse</option>
                                    
                                </select>
                            </td>
                        </tr>
                        
                        
                        <tr>
                            <td colSpan='2'>
                                <button className='btn btn-danger' type='submit'>Create Store</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )


}

export default StatusMaker;