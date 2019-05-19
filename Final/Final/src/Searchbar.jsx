import React from 'react'
import AdList from './AdList';
import { BrowserRouter, Route, Link } from "react-router-dom";


export default class Searchbar extends React.Component {

    constructor() {
        super()
        this.state = {
            searchTitle: '',
            filtered: [],
            select: 'all'
        }
    }

    handleSearch() {
        let currentList = this.props.ads;
        let newList = [];

        // If the search bar isn't empty
        if (this.state.searchTitle !== "") {
            newList = currentList.filter(p => {
                const title = p.title.toLowerCase();
                const filter = this.state.searchTitle.toLowerCase();
                if (this.state.select !== "all") {
                    const type = p.type.toLowerCase()
                    return title.includes(filter) && type === this.state.select;
                }
                return title.includes(filter);
            });
            
        } else {
            if (this.state.select !== "all") {
                newList = currentList.filter(p => {
                    const type = p.type.toLowerCase()
                    return type === this.state.select;
                })
            } else {
                newList = this.props.ads;
            }
        }
        this.setState({
            filtered: newList
        });
    }

    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleChangeSelect(e) {
        this.setState({
            select: e.target.value
        })
        
    }

    render() {
        return (
            <div>
                <div class="container input-group mb-3">
                    <input type="text" name="searchTitle" class="form-control"
                        style={{borderRadius: '5px'}}
                        value={this.state.searchTitle} placeholder="Search by products' name and type"
                        onChange={this.handleChange.bind(this)}/>
                    <div class="input-group-prepend">
                        <select class="form-control" id="exampleFormControlSelect1" style={{borderRadius: '5px'}} onChange={this.handleChangeSelect.bind(this)}>
                            <option value="all">All types</option>
                            <option value="apartment">Apartments</option>
                            <option value="house">Houses</option>
                            <option value="villa">Villa</option>
                            <option value="land">Land</option>
                        </select>
                    </div>
                    <div class="input-group-prepend">

                    <Link to={`/SearchResult/${this.state.searchTitle}${this.state.select}`}>
                    <button class="btn btn-secondary text-white btn-secondary-fixed" type="button" onClick={this.handleSearch.bind(this)}>
                            <i class="fa fa-search"></i>
                        </button>  
                    </Link>
                    
                    </div>
                </div>
                
                <Route path={`/SearchResult/:searchTitle`} render={(props)=>
                    <AdList ads={this.state.filtered} />
                }/>
            </div>
        )
    }
}