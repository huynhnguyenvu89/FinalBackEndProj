import React from 'react'
import Searchbar from './Searchbar';
import OneAd from './OneAd';
import { BrowserRouter, Route, Link } from "react-router-dom";

const url = 'http://localhost:1111/product'

export default class AdList extends React.Component {

    componentDidMount() {
        console.log("in ad list")
    }

    constructor() {
        super()
        this.state = {
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

    handleAdd() {
        this.setState({
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
        })
    }

    handleType(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleUpdate() {
        if (this.state.title !== '' && this.state.price !== '' && this.state.type !== '' && this.state.bedrooms !== ''
            && this.state.floors !== '' && this.state.area !== '' && this.state.direction !== '' && this.state.owner !== ''
            && this.state.phone !== '' && this.state.address !== '' && this.state.postdate !== '' && this.state.expiredate !== '') {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    title: this.state.title,
                    price: this.state.price,
                    type: this.state.type,
                    bedrooms: this.state.bedrooms,
                    floors: this.state.floors,
                    area: this.state.area,
                    direction: this.state.direction,
                    owner: this.state.owner,
                    phone: this.state.phone,
                    address: this.state.address,
                    postdate: this.state.postdate,
                    expiredate: this.state.expiredate,
                    description: this.state.description,
                    url: this.state.url,
                    project: this.state.project
                })
            })
                .then(() => this.props.fetchHome())
            alert('Product has been created successfully')
        }
        else {
            alert('Missing information')
        }
    }

    render() {
        return (
            <div class="container">
                <div style={{ paddingLeft: 15 }}>
                <div class="d-flex mb-2">
                    <div class="ml-auto mr-0">
                        <button type="button" class="btn btn-light" data-toggle="modal" data-target="#myModal1" onClick={this.handleAdd.bind(this)}>New product <i class="fa fa-plus-circle"></i></button>
                    </div>
                </div>
                <div class="row">
                    {this.props.ads.map((a)=>
                    <Link to={`/advertisement/${a._id}`} style={{ color: "inherit", textDecoration: "none" }} class="col-lg-4 pb-4">
                        <OneAd title={a.title} address={a.address} area={a.area} url={a.url}/>
                    </Link>
                    )}
                </div>
                </div>
                <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
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
                                    <button type="button" class="btn btn-outline-dark" style={{ width: 500 }} onClick={this.handleUpdate.bind(this)}>Create new product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}