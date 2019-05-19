import React from 'react'
import './js/bs-animation.js'
import { BrowserRouter, Link, Route } from 'react-router-dom'
var signupFail = true
var loginFail = true
const url = 'http://localhost:1111/user'
export default class Header extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            name: "",
            token: "",
            currentUser: ""
        }
    }

    handleType(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleLogin() {
        if (this.state.email !== '' && this.state.password !== '') {
            fetch(url + '/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(res=>{
                console.log(res)
                loginFail = false
                alert('Login successful')
            }).then(res=>
                fetch(url + '/login/'+this.state.email)
            .then(res => res.json())
            .then(json => {
                this.setState({ currentUser: json })
                console.log(this.state.currentUser)
            })
            )
            
            
        }
        else {
            alert('Missing information')
        }
    }

    handleSignup() {
        if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '') {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(res=>{
                signupFail = false
                alert('Account created')
            })
        }
        else {
            alert('Missing information')
        }
        this.handleLogin()
    }


    render() {
        return (
            <div>
                <section>
                    <div data-bs-parallax-bg="true" style={{ height: '500px', backgroundImage: `url(${require('./images/pic1.jpg')})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        <nav class="navbar navbar-light navbar-expand-md navbar-transparency" style={{position: 'relative'}}>
                            <div class="container">
                                <div><a class="navbar-brand" href="#">BRAND</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button></div>
                                <div class="collapse navbar-collapse "
                                    id="navcol-1">
                                    <ul class="nav navbar-nav float-left ml-auto">
                                    <li class="nav-item" role="presentation">                                             
                                    <a class="nav-link text-dark d-sm-flex justify-content-sm-start align-items-sm-start" href="#" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>
                                           <Link to={'/'} style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                                           </a></li>
                                      <li class="nav-item" role="presentation">
                                             <a class="nav-link text-dark" href="#" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>                                                 
                                             <Link to={'/advertisement'} style={{ color: "inherit", textDecoration: "none" }}>Advertisements</Link>
                                             </a>
                                         </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link text-dark" href="#" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>
                                            <Link to={'/project'} style={{ color: "inherit", textDecoration: "none" }}>Projects</Link>
                                            </a>
                                            </li>
                                        {loginFail === true? 
                                        <li class="nav-item d-md-flex m-auto justify-content-md-center" role="presentation"><a class="nav-link text-dark" href="#" data-toggle="modal" data-target="#signup" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Login</a></li>
                                        :null}
                                        {loginFail === true? 
                                        <li class="nav-item d-md-flex m-auto justify-content-md-center" role="presentation"><a class="nav-link text-dark" href="#" data-toggle="modal" data-target="#signin" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Sign Up</a></li>
                                        :null}
                                        
                                        <li class="nav-item dropdown"><a class="dropdown-toggle nav-link text-dark" data-toggle="dropdown" aria-expanded="false" href="#" style={{ fontSize: '16px', filter: 'contrast(140%)' }}>Dropdown </a>
                                            <div class="dropdown-menu" role="menu"><a class="dropdown-item" role="presentation" href="#">First Item</a><a class="dropdown-item" role="presentation" href="#">Second Item</a><a class="dropdown-item" role="presentation" href="#">Third Item</a></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>


                    <div class="modal fade" role="dialog" tabindex="-1" id="signup">
                        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Sign In</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="fa fa-envelope-o"></i></span></div><input class="form-control" type="email" required="" placeholder="Email" value={this.state.email} name="email" onChange={this.handleType.bind(this)}/>
                                                <div class="input-group-append"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="fa fa-lock"></i></span></div><input class="form-control" type="password" required="" placeholder="Password" value={this.state.password} name="password" onChange={this.handleType.bind(this)}/>
                                                <div class="input-group-append"></div>
                                            </div>
                                        </div>
                                        <div class="form-group"><button class="btn btn-primary btn-lg text-white" style={{ width: '100%' }} type="button" onClick={this.handleLogin.bind(this)}>Log in</button></div>
                                    </form>
                                    <hr style={{ backgroundColor: '#bababa' }} />
                                    <p class="text-center">Or&nbsp;<a class="text-decoration-none" href="#">Forget password</a></p>
                                    <p class="text-center">Don't have an account? &nbsp;<a class="text-decoration-none" data-dismiss="modal" data-toggle="modal" data-target="#signin" href="#">Sign Up</a></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" role="dialog" tabindex="-1" id="signin">
                        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Sign Up Now</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                                <div class="modal-body">
                                    <div class="text-center"><button class="btn btn-primary text-left" style={{width: '100%'}} type="button"><i class="fa fa-facebook"></i>&nbsp; Continue with Facebook</button></div>
                                    <div class="text-center mt-2"><button class="btn btn-light text-left border-dark" style={{width: '100%'}} type="button"><i class="fa fa-google"></i>&nbsp; Continue with Google</button></div>
                                    <form class="mt-4">
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="fa fa-user-o"></i></span></div><input class="form-control" type="text" required="" placeholder="Full Name" name="name" onChange={this.handleType.bind(this)} value={this.state.name}/>
                                                <div class="input-group-append"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="fa fa-envelope-o"></i></span></div><input class="form-control" type="email" required="" placeholder="Email" name="email" onChange={this.handleType.bind(this)} value={this.state.email}/>
                                                <div class="input-group-append"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="fa fa-lock"></i></span></div><input class="form-control" type="password" required="" placeholder="Password" name="password" onChange={this.handleType.bind(this)} value={this.state.password}/>
                                                <div class="input-group-append"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="form-check"><input class="form-check-input" type="checkbox" id="formCheck-1" required="" checked="" /><label class="form-check-label" for="formCheck-1">I agree all the terms and conditions.</label></div>
                                        </div>
                                        <div class="form-group"><button class="btn btn-primary btn-lg text-white" style={{width: '100%'}} type="button" onClick={this.handleSignup.bind(this)}>Sign Up</button></div>
                                    </form>
                                    <hr style={{backgroundColor: '#bababa'}} />
                                    <p class="text-center">Already have an Account?&nbsp;<a class="text-decoration-none" data-dismiss="modal" data-toggle="modal" data-target="#signup" href="#">Log In</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}