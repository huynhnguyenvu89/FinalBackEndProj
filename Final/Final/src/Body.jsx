import React from 'react'
import Searchbar from './Searchbar';
import AdList from './AdList';
import ProjectList from './ProjectList';
import ProductDetail from './ProductDetail';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class Body extends React.Component {

    constructor() {
        super()
        this.state = {
            
            filtered: []
        }
    }

    


    render() {
        return (
                        <div class="container">
                            <div style={{ paddingLeft: 15 }}><AdList ads={this.state.ads} /></div>
                        </div>
        )
    }
}