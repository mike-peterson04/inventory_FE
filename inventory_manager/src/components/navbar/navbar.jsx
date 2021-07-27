
function Navbar(props){
    
    


    if(props.caller === 'employee'){
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={(e)=>props.changeView(e,'products')}>My Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#"onClick={(e)=>props.changeView(e,'requests')}>My Requests</a>
                        </li>
                    </ul>
                </div>
            </nav>)
        }
}
export default Navbar