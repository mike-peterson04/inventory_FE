
function EmployeeProducts(props){
    debugger;

    function getModel(modelId){
        
        let result = props.model.filter((model)=>{
            if (model.id === modelId){
                return true;
            }
            return false;
        });
        return result[0].name

    }

    function getStatus(statusId)
    {
        
        let result = props.status.filter((status)=>{
            if (status.id === statusId){
                return true;
            }
            return false;
        });
        return result[0].name

    }

    function buildTable(product){
        
        let model = getModel(product.model)
        let status = getStatus(product.status)
        return(<table>
            <tbody>
                <tr>
                    <td>Model:</td>
                    <td>{model}</td>
                    <td>Current Status:</td>
                    <td>{status}</td>
                </tr>
                <tr>
                    <td>
                        {status.toUpperCase() !=='PENDING_CHECK_IN'&&<button className='btn btn-secondary' onClick={(e)=>props.updateProduct(e,product,'return')}>Start Return</button>}
                    </td>
                    <td>
                        {status.toUpperCase() !=='CHECKED_OUT'&&<button className='btn btn-secondary'onClick={(e)=>props.updateProduct(e,product,'confirm')}>Confirm Possesion</button>}
                    </td>
                    <td>
                        <button className='btn btn-secondary'onClick={(e)=>props.updateProduct(e,product,'lost')}>Report Lost or Damaged</button>
                    </td>
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>)

    }

return props.products.map(buildTable)
}
export default EmployeeProducts