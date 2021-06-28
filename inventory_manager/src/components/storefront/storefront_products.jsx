
function StorefrontProducts(props){

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
        if(status.toUpperCase() !== 'SOLD'){
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
                        {status.toUpperCase() ==='AT_STORE'&&<button className='btn btn-warning' onClick={(e)=>props.updateProduct(e,product,'sold')}>Report Sold</button>}
                    </td>
                    <td>
                        {status.toUpperCase() ==='AT_STORE_IN_TRANSIT'&&<button className='btn btn-warning'onClick={(e)=>props.updateProduct(e,product,'confirm')}>Confirm Delivery</button>}
                    </td>
                    <td>
                        <button className='btn btn-warning'onClick={(e)=>props.updateProduct(e,product,'lost')}>Report Lost or Damaged</button>
                    </td>
                    <td>
                        Product_Id: {product.id}
                    </td>
                </tr>
            </tbody>
        </table>)}

    }


return props.products.map(buildTable)
}
export default StorefrontProducts