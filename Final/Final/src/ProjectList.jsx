import React from 'react'
import Searchbar from './Searchbar';
import AdList from './AdList';

import { BrowserRouter, Route, Link } from "react-router-dom";

const url = 'http://localhost:1111/project'
export default class ProjectList extends React.Component {

    constructor() {
        super();
        this.state = {
            collapseStatus1: "fas fa-chevron-up",
            name: "",
            owner: "",
            type: "",
            area: "",
            startyear: "",
            endyear: ""
        }
    }

    handleType(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    changeArrow(e) {
        var obj = {}
        if (this.state[e.target.id] == "fas fa-chevron-up") {
            obj[e.target.id] = "fas fa-chevron-down"
            this.setState(obj)
        }
        else {
            obj[e.target.id] = "fas fa-chevron-up"
            this.setState(obj)
        }
    }

    handleAdd() {
        this.setState({
            name: "",
            owner: "",
            type: "",
            area: "",
            startyear: "",
            endyear: ""
        })
    }

    handleUpdate() {
        if (this.state.name !== '' && this.state.owner !== '' && this.state.type !== '' && this.state.area !== ''
            && this.state.startyear !== '' && this.state.endyear !== '') {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({
                    name: this.state.name,
                    owner: this.state.owner,
                    type: this.state.type,
                    area: this.state.area,
                    startyear: this.state.startyear,
                    endyear: this.state.endyear
                })
            })
                .then(() => this.props.fetchProject())
            alert('Product has been created successfully')
        }
        else {
            alert('Missing information')
        }
    }

    render() {
        return (
            <div class="container" style={{ paddingBottom: 15 }}>
                <div class="d-flex mb-2">
                    <div class="ml-auto mr-0">
                        <button type="button" class="btn btn-light" data-toggle="modal" data-target="#myModal1" onClick={this.handleAdd.bind(this)}>New project <i class="fa fa-plus-circle"></i></button>
                    </div>
                </div>

                {this.props.projects.map(p =>
                    <Link to={`/project/${p._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        <div class="card text-left my-3">
                            <div class="pl-3">
                                <h4 style={{ paddingTop: 10 }}>{p.name}</h4>
                                <p>Type: {p.type}</p>
                                <p>Area: {p.area} square area</p>
                            </div>
                        </div>
                    </Link>
                )}

                <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Project Information</h4>
                            </div>
                            <div class="modal-body" style={{ width: 660, paddingLeft: 140 }}>
                                <div class="form-group">
                                    <label for="name">Name:</label>
                                    <input type="text" class="form-control" id="name" value={this.state.name} name="name" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="owner">Owner:</label>
                                    <input type="text" class="form-control" id="owner" value={this.state.owner} name="owner" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="type">Type:</label>
                                    <input type="text" class="form-control" id="type" name="type" onChange={this.handleType.bind(this)} value={this.state.type} />
                                </div>
                                <div class="form-group">
                                    <label for="area">Area:</label>
                                    <input type="text" class="form-control" id="area" value={this.state.area} name="area" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="startyear">Start year:</label>
                                    <input type="text" class="form-control" id="startyear" value={this.state.startyear} name="startyear" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="form-group">
                                    <label for="endyear">End year:</label>
                                    <textarea type="text" class="form-control" id="endyear" value={this.state.endyear} name="endyear" onChange={this.handleType.bind(this)} />
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn btn-outline-dark" style={{ width: 500 }} onClick={this.handleUpdate.bind(this)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const myStyle = {
    margin: 12,
    marginLeft: 20
}