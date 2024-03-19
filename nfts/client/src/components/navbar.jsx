import { NavLink } from "react-router-dom";


export default function Navbar() {

    return (
        <div className="topnav">
            <NavLink exact to="/" activeClassName="active">
                Collections
            </NavLink>
            <NavLink to="/omb" activeClassName="active">
                Ordinal Maxi Biz
            </NavLink>
            <NavLink to="/qmc" activeClassName="active">
                Quantum (Milady) Cats
            </NavLink>
            <NavLink to="/collectionbycontract" activeClassName="active">
                Collections By Contract
            </NavLink>
        </div>
    )
}