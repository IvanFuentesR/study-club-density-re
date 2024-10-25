import Link from 'next/link'
export default ({currentUser})=>{
    //[false, false, {label: 'Sign Out', href: '/auth/signout'}]
    const links = [
        !currentUser && {label: 'Sign Up', href: '/auth/signup'}, 
        !currentUser && {label: 'Sign In', href: '/auth/signin'}, 
        currentUser && {label: 'Sign Out', href: '/auth/signout'}]
        .filter(linkConfig => linkConfig)
        .map(({label, href})=>{
            return <li key={href}>
                <Link className="nav-link" href={href}>
                   {label}
                </Link>
            </li>   
        }
        );
  
    return <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" href="/">
           GitTix
        </Link>

        <div className="d-flex justify-content-end">
            <ul>
                {currentUser ? "Sign out" : "Sign in/up"}
               
            </ul>

        </div>
    </nav>
}