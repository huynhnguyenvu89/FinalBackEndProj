import React from 'react'
import starEmpty from './images/star-empty.svg'
import starHalfEmpty from './images/star-half-empty.svg'
import star from './images/star.svg'
import 'jquery'
import 'baguettebox.js'
import './js/theme.js'

const urlGet = 'http://5cb04f6bf7850e0014629aa3.mockapi.io/products'
const url = 'http://localhost:1111/product'
const id = '1'
export default class ProductDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            product: [],
            relatedProduct: [],
            _id: "",
            id: "",
            title: "",
            price: "",
            area: "",
            bedrooms: "",
            floors: "",
            direction: "",
            owner: "",
            phone: "",
            address: "",
            postdate: "",
            expiredate: "",
            url: "",
            description: "",
            project: "",
            type: ""
        }
    }
    handleType(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    mySetState(_id ,id, title , price, area, bedrooms, floors, direction, owner, phone, address, postdate, expiredate, url, description, project, type) {
        this.setState(
            {_id: _id,
            id: id,
            title: title,
            price: price,
            area: area,
            bedrooms: bedrooms,
            floors: floors,
            direction: direction,
            owner: owner,
            phone: phone,
            address: address,
            postdate: postdate,
            expiredate: expiredate,
            url: url,
            description: description,
            project: project,
            type: type}
        )
    }

    handleDelete(id) {
        if (window.confirm('Do you want to delete?')) {
            fetch(url + '/' + id, {
                method: 'delete'
            })
                .then(res => this.props.fetchHome())
        }
    }

    fetchProduct() {
        const { match: { params } } = this.props;
        fetch(url + '/' + params.id)
            .then(res => res.json())
            .then(json => {
                //let data = json.filter(d => d.id === '1')
                this.setState({ product: json })
            })
    }

    fetchRelatedProduct() {
        const { match: { params } } = this.props;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => d._id !== params.id)
                let rela = data.filter((d, i) => i >= 0 && i <= 2)
                this.setState({ relatedProduct: rela })
            })
    }

    componentDidMount() {
        this.fetchProduct()
        this.fetchRelatedProduct()
    }
    //_id ,id, title , price, area, bedrooms, floors, direction, owner, phone, address, postdate, expiredate, url, description, project
    handleEdit() {
        if (this.state.id !== '' && this.state.title !== '' && this.state.price !== '' && this.state.area !== ''
        && this.state.bedrooms !== '' && this.state.floors !== '' 
        && this.state.direction !== '' && this.state.owner !== '' && this.state.phone !== '' && this.state.address !== ''
        && this.state.postdate !== '' && this.state.expiredate !== '' 
        && this.state.url !== '' && this.state.description !== '' && this.state.project !== '') {
        //update
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(
                {_id: this.state._id,
                    id: this.state.id,
                    title: this.state.title,
                    price: this.state.price,
                    area: this.state.area,
                    bedrooms: this.state.bedrooms,
                    floors: this.state.floors,
                    direction: this.state.direction,
                    owner: this.state.owner,
                    phone: this.state.phone,
                    address: this.state.address,
                    postdate: this.state.postdate,
                    expiredate: this.state.expiredate,
                    url: this.state.url,
                    description: this.state.description,
                    project: this.state.project}
            )
        })
            .then(res => {
                this.props.fetchHome()})
            alert('Project has been updated successfully')
       
    }
    else {
        alert('Missing information')
    }
    }

    render() {
        return (
            <div class="bg-dark page landing-page" style={{ paddingTop: '15px' }}>

                <main class="page product-page">
                    <section class="clean-block clean-product dark">
                        <div class="container" style={{ backgroundColor: "#D3D3D3", paddingBottom: '30px' }}>

                            {/* <div class="block-heading">
                                    <h2 class="text-info">Product Page</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                                </div> */}
                            {this.state.product.map((p) =>
                            <div>
                                <div class="text-right" style={{ padding: 15 }}>
                                    <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#myModal3" onClick={this.mySetState.bind(this, p._id ,p.id, p.title , p.price, p.area, p.bedrooms, p.floors, p.direction, p.owner, p.phone, p.address, p.postdate, p.expiredate, p.url, p.description, p.project, p.type)}>Edit <i class="fa fa-edit"></i></button>
                                    <button type="button" class="btn btn-outline-danger" onClick={this.handleDelete.bind(this, p._id)}>Delete <i class="far fa-trash-alt"></i></button>
                                </div>
                                <div class="block-content pt-5">
                                    <div class="product-info">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="gallery">
                                                    <div class="sp-wrap">
                                                        <a><img class="img-fluid d-block mx-auto" src={p.url} /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="info">
                                                    <h3>{p.title}</h3>
                                                    <h6>Area: {p.area} square meter</h6>
                                                    <div class="price">
                                                        <h4>${p.price}</h4>
                                                    </div>
                                                    <div class="rating p-3"><img src={star} /><img src={star} /><img src={star} /><img src={starHalfEmpty} /><img src={starEmpty} /></div>
                                                    <button class="btn btn-primary" type="button"><i class="icon-basket"></i>Contact owner</button>
                                                    <div class="summary pt-3">
                                                        <h4>Contact info</h4>
                                                        <p>Owner: {p.owner}</p>
                                                        <p>Phone: {p.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ paddingRight: '750px' }}>
                                        <ul class="nav nav-tabs" id="myTab">
                                            <li class="nav-item"><a class="nav-link active" role="tab" data-toggle="tab" id="description-tab" href="#description">Description</a></li>
                                            <li class="nav-item"><a class="nav-link" role="tab" data-toggle="tab" id="specifications-tabs" href="#specifications">Specifications</a></li>
                                            <li class="nav-item"><a class="nav-link" role="tab" data-toggle="tab" id="reviews-tab" href="#reviews">Reviews</a></li>
                                        </ul>
                                    </div>
                                    <div class="product-info">
                                        <div>
                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane active fade show description" role="tabpanel" id="description">
                                                    <p class="text-left">{p.description}</p>
                                                </div>
                                                <div class="tab-pane fade show specifications" role="tabpanel" id="specifications">
                                                    <div class="table-responsive table-bordered">
                                                        <table class="table table-bordered">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="stat">Number of floors</td>
                                                                    <td>{p.floors}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="stat">Number of rooms</td>
                                                                    <td>{p.bedrooms}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="stat">Direction</td>
                                                                    <td>{p.direction}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="stat">Post Date</td>
                                                                    <td>{p.postdate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="stat">Expire Date</td>
                                                                    <td>{p.expiredate}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade show" role="tabpanel" id="reviews">
                                                    <div class="reviews">
                                                        <div class="review-item">
                                                            <div class="rating"><img src={star} /><img src={star} /><img src={star} /><img src={star} /><img src={starEmpty} /></div>
                                                            <h4>Incredible product</h4><span class="text-muted"><a href="#">John Smith</a>, 20 Jan 2018</span>
                                                            <p>I think it's great so I'm just gonna put it that way</p>
                                                        </div>
                                                    </div>
                                                    <div class="reviews">
                                                        <div class="review-item">
                                                            <div class="rating"><img src={star} /><img src={star} /><img src={star} /><img src={star} /><img src={starEmpty} /></div>
                                                            <h4>Incredible product</h4><span class="text-muted"><a href="#">Gabriel Belmont</a>, 19 May 2019</span>
                                                            <p>What a nice view! Gotta trade my castle for it</p>
                                                        </div>
                                                    </div>
                                                    <div class="reviews">
                                                        <div class="review-item">
                                                            <div class="rating"><img src={star} /><img src={star} /><img src={star} /><img src={star} /><img src={starEmpty} /></div>
                                                            <h4>Incredible product</h4><span class="text-muted"><a href="#">John Smith</a>, 20 May 2019</span>
                                                            <p>Hi I'm from the future. And now I know why my dad lost his castle</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            )}
                            <div class="clean-related-items">
                                <h3 class="pb-2">Related Products</h3>
                                <div class="items">
                                    <div class="row justify-content-center">
                                        {this.state.relatedProduct.map((p) =>
                                            <div class="col-sm-6 col-lg-4">
                                                <div class="clean-related-item">
                                                    <div class="image"><a href="#"><img class="img-fluid d-block mx-auto" src={p.url} style={{ height: 193 }} /></a></div>
                                                    <div class="related-name pt-2"><h5 class="text-black">{p.title}</h5>
                                                        <div class="rating"><img src={star} /><img src={star} /><img src={star} /><img src={starHalfEmpty} /><img src={starEmpty} /></div>
                                                        <h4>${p.price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Enter Advertisement Info</h4>
                            </div>
                            <div class="modal-body" style={{ width: 660, paddingLeft: 140 }}>
                                <div class="form-group">
                                    <label for="title">Title:</label>
                                    <input type="text" class="form-control" id="title" value={this.state.title} name="title" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="type">Advertisement Type:</label>
                                    <input type="text" class="form-control" id="type" value={this.state.type} name="type" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="price">Price:</label>
                                    <input type="text" class="form-control" id="price" name="price" onChange={this.handleType.bind(this)} value={this.state.price} />
                                </div>
                                <div class="form-group">
                                    <label for="area">Area:</label>
                                    <input type="text" class="form-control" id="area" value={this.state.area} name="area" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="bedrooms">Room:</label>
                                    <input type="text" class="form-control" id="bedrooms" value={this.state.bedrooms} name="bedrooms" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="direction">Direction:</label>
                                    <input type="text" class="form-control" id="direction" value={this.state.direction} name="direction" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="floors">Floor:</label>
                                    <input type="text" class="form-control" id="floors" value={this.state.floors} name="floors" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="owner">Owner name:</label>
                                    <input type="text" class="form-control" id="owner" value={this.state.owner} name="owner" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="phone">Phone:</label>
                                    <input type="text" class="form-control" id="phone" value={this.state.phone} name="phone" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="address">Address:</label>
                                    <input type="text" class="form-control" id="address" value={this.state.address} name="address" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="postdate">Post date:</label>
                                    <input type="text" class="form-control" id="postdate" value={this.state.postdate} name="postdate" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="expiredate">Expire date:</label>
                                    <input type="text" class="form-control" id="expiredate" value={this.state.expiredate} name="expiredate" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="url">Image URL:</label>
                                    <input type="text" class="form-control" id="url" value={this.state.url} name="url" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="description">Description:</label>
                                    <input type="text" class="form-control" id="description" value={this.state.description} name="description" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="project">Belong to project:</label>
                                    <input type="text" class="form-control" id="project" value={this.state.project} name="project" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn btn-outline-dark" style={{ width: 500 }} onClick={this.handleEdit.bind(this)}>Update product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
