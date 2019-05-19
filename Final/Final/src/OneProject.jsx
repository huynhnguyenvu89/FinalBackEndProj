import React from 'react'
import starEmpty from './images/star-empty.svg'
import starHalfEmpty from './images/star-half-empty.svg'
import star from './images/star.svg'
import 'jquery'
import 'baguettebox.js'
import './js/theme.js'
import AdList from './AdList';
const url = 'http://localhost:1111/project'
const urlProduct = 'http://localhost:1111/product'
const id = '1'
export default class OneProject extends React.Component {
    constructor() {
        super()
        this.state = {
            project: [],
            relatedProduct: [],
            empty: false,
            _id: '',
            id: '',
            name: '',
            owner: '',
            type: '',
            area: '',
            startyear: '',
            endyear: ''
        }
    }

    fetchProject() {
        const { match: { params } } = this.props;
        fetch(url + '/' + params.id)
            .then(res => res.json())
            .then(json => {
                //let data = json.filter(d => d.id === '1')
                this.setState({ project: json })
            })
    }

    fetchRelatedProduct() {
        //const { match: { params } } = this.props;
        fetch(urlProduct)
            .then(res => res.json())
            .then(json => {
                let data = json.filter(d => d.project.toLowerCase() === this.state.project[0].name.toLowerCase())
                this.setState({ relatedProduct: data })
            })
    }

    componentDidMount() {
        this.fetchProject()
        this.fetchRelatedProduct()
    }

    mySetState(_id ,id, name , owner, type, area, startyear, endyear) {
        this.setState(
            {_id: _id,
            id: id,
            name: name,
            owner: owner,
            type: type,
            area: area,
            startyear: startyear,
            endyear: endyear}
        )
    }

    handleType(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleDelete(id) {
        if (window.confirm('Do you want to delete?')) {
            fetch(url + '/' + id, {
                method: 'delete'
            })
                .then(res => this.props.fetchProject())
                this.setState({empty:true})
        }
    }

    handleType(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleEdit() {
        if (this.state.name !== '' && this.state.price !== '' && this.state.type !== '' && this.state.area !== ''
        && this.state.startyear !== '' && this.state.endyear !== '') {
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
                name: this.state.name, 
                type: this.state.type, 
                area: this.state.area,
                owner: this.state.owner,
                startyear: this.state.startyear,
                endyear: this.state.endyear}
            )
        })
            .then(res => {
                console.log("fetch project")
                this.props.fetchProject()})
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
                        <div class="container" style={{ backgroundColor: "#D3D3D3", paddingBottom: '30px', paddingLeft: 0, paddingRight: 0 }}>
                            {this.state.project.map((p) =>
                                <div>
                                    <div class="text-right" style={{padding: 15}}>
                                        <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#myModal2" onClick={this.mySetState.bind(this,p._id,p.id ,p.name , p.owner, p.type, p.area, p.startyear, p.endyear)}>Edit <i class="fa fa-edit"></i></button>
                                        <button type="button" class="btn btn-outline-danger" onClick={this.handleDelete.bind(this, p._id)}>Delete <i class="far fa-trash-alt"></i></button>
                                    </div>
                                    <div>
                                        <h4 style={{ paddingTop: 10 }}>{p.name}</h4>
                                        <p>Type: {p.type}</p>
                                        <p>Area: {p.area} square area</p>
                                        <p>Created by: {p.owner}</p>
                                        <p>From {p.startyear} to {p.endyear}</p>
                                    </div>
                                </div>

                            )}
                            <div class="clean-related-items">
                                <h3 class="pb-2">Related Products</h3>
                                <AdList ads={this.state.relatedProduct} />
                            </div>
                        </div>
                    </section>
                </main>

                <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Edit Project Information</h4>
                                    </div>
                                    <div class="modal-body" style={{ width: 660, paddingLeft: 140 }}>
                                    <div class="form-group">
                                            <label for="id">ID:</label>
                                            <input type="text" class="form-control" id="id" value={this.state.id} name="id" onChange={this.handleType.bind(this)}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Name:</label>
                                            <input type="text" class="form-control" id="name" value={this.state.name} name="name" onChange={this.handleType.bind(this)}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="owner">Owner:</label>
                                            <input type="text" class="form-control" id="owner" value={this.state.owner} name="owner" onChange={this.handleType.bind(this)}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="type">Type:</label>
                                            <input type="text" class="form-control" id="type" name="type" onChange={this.handleType.bind(this)} value={this.state.type}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="area">Area:</label>
                                            <input type="text" class="form-control" id="area" value={this.state.area} name="area" onChange={this.handleType.bind(this)}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="startyear">Start year:</label>
                                            <input type="text" class="form-control" id="startyear" value={this.state.startyear} name="startyear" onChange={this.handleType.bind(this)}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="endyear">End year:</label>
                                            <textarea type="text" class="form-control" id="endyear" value={this.state.endyear} name="endyear" onChange={this.handleType.bind(this)}/>
                                        </div>
                                        <div class="text-center">
                                        <button type="button" class="btn btn-outline-dark" style={{width:500}} onClick={this.handleEdit.bind(this)}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}
