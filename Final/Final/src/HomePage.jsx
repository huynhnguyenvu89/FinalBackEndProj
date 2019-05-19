import React from 'react'
import pic5 from './images/image5.jpg'
import avatar1 from './images/avatar1.jpg'
import avatar2 from './images/avatar2.jpg'
import avatar3 from './images/avatar3.jpg'
import pic3 from './images/pic3.jpeg'


export default class HomePage extends React.Component {

    handleLogin() {
        
    }

    render() {
        return (
            <div>
                <main class="bg-dark page landing-page" style={{ paddingTop: '50px' }}>
                    <section class="bg-dark clean-block clean-info dark">
                        <div class="container bg-dark">
                            <div class="block-heading">
                                <h2 class="text-monospace text-info">Introduction</h2>
                                <p class="lead text-light">Our website works as a real estate portal, which allows visitors to view and choose to deal
                                from a wide range of estate materials. It also enables visitors to create an account and start managing their business.</p>
                            </div>
                            <div class="row align-items-center mt-5">
                                <div class="col-md-6"><img class="img-thumbnail img-fluid" src={pic3}
                                    style={{ zIndex: '0' }} /></div>
                                <div class="col-md-6">
                                    <h3 class="text-center text-info">Magnificent Portal</h3>
                                    <div class="getting-started-info">
                                        <p class="text-light">Take your time to browse through a tremendous list of stunning apartments
                                        or start your own business here!</p>
                                    </div><a class="btn btn-outline-light btn-lg" role="button" href="#" data-toggle="modal" data-target="#signup">Join
                            Now</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="clean-block about-us" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                        <div class="container">
                            <div class="block-heading">
                                <h2 class="text-info">About Us</h2>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-4">
                                    <div class="card clean-card text-center"><img class="img-thumbnail card-img-top w-100 d-block"
                                        src={avatar1} style={{ width: '328px', height: '220px' }} />
                                        <div class="card-body info">
                                            <h4 class="card-title">Duy Khang</h4>
                                            <p class="card-text">The founder of this website, and is studying Bachelor of IT in RMIT
                                    Vietnam</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-4">
                                    <div class="card clean-card text-center"><img class="card-img-top w-100 d-block"
                                        src={avatar2}style={{ width: '328px', height: '220px' }}  />
                                        <div class="card-body info">
                                            <h4 class="card-title">Nguyên Nguyễn</h4>
                                            <p class="card-text">Co-founder of this website. He is studying Bachelor of IT
                                            in RMIT Vietnam</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-4">
                                    <div class="card clean-card text-center"><img class="card-img-top w-100 d-block"
                                        src={avatar3} style={{ width: '328px', height: '220px' }}  />
                                        <div class="card-body info">
                                            <h4 class="card-title">Huỳnh Nguyện</h4>
                                            <p class="card-text">Co-founder of this website. She is a student of Software Engineering in
                                            RMIT Vietnam</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <div class="modal fade" role="dialog" tabindex="-1" id="signup">
                        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Sign In</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div>
                                <div class="modal-body">
                                    <form>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="far fa-envelope-open"></i></span></div><input class="form-control" type="email" required="" placeholder="Email" />
                                                <div class="input-group-append"></div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <div class="input-group-prepend"><span class="text-primary input-group-text"><i class="fa fa-lock"></i></span></div><input class="form-control" type="password" required="" placeholder="Password" />
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
            </div>
        )
    }
}