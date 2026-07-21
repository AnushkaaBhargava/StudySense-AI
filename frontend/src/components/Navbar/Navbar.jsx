import "./Navbar.css";

function Navbar(){

    return(

        <nav className="navbar">

    <div className="container nav-content">

        <h2>
            StudySense <span>AI</span>
        </h2>

        <div className="nav-links">
            <a href="/">Home</a>
            <a href="/">Features</a>
            <a href="/">About</a>
        </div>

        <button>Login</button>

    </div>

</nav>

    )

}

export default Navbar;