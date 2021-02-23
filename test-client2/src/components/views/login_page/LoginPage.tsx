import React, { Component } from 'react'

export class LoginPage extends Component {
    render() {
        return (
            <main className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="visually-hidden">
                        Email address
                    </label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                    <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember
                    </label>
                    </div>
                    <div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        {/* <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button> */}
                    </div>
                    
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>
            </main>
        )
    }
}

export default LoginPage
