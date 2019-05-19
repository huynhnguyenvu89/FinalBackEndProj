import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import CardCarousel from './CardCarousel';
import ProductDetail from './ProductDetail';
import HomePage from './HomePage';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Body from './Body'
import Searchbar from './Searchbar';
import AdList from './AdList';
import ProjectList from './ProjectList';
import OneProject from './OneProject';


const url = 'http://localhost:1111/product'
const urlProject = 'http://localhost:1111/project'
export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      filered: [],
      pathname: '', 
      ads: [],
      searchTitle: '',
      projects: []
    }
  }

  readPathName() {
    let pathname = window.location.pathname;
    this.setState({ pathname: pathname })
  }

  componentDidMount() {
    this.readPathName()
  }

  
  fetchHome() {
    fetch(url).then(res => res.json())
        .then(json => this.setState({ ads: json }))
  }

  fetchProject() {
    console.log("fetchProject")
    fetch(urlProject).then(res => res.json())
        .then(json => {
          console.log(json)

          this.setState({ projects: json })
        })
  }

componentDidMount() {
    this.fetchHome()
    this.fetchProject()
}

handlePrice() {
    fetch(url).then((res) => res.json())
        .then((data) => {
            data.sort((a, b) => a.price - b.price);
            this.setState({ home: data });
        });

}

handlePrice1() {
    fetch(url).then((res) => res.json())
        .then((data) => {
            data.sort((a, b) => b.price - a.price);
            this.setState({ home: data });
        });
}

handleName() {
    fetch(url).then((res) => res.json())
        .then((data) => {
            data.sort((a, b) => a.title.localeCompare(b.title));
            this.setState({ home: data });
        });
}
handleName1() {
    fetch(url).then((res) => res.json())
        .then((data) => {
            data.sort((a, b) => b.title.localeCompare(a.title));
            this.setState({ home: data });
        });
}

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header />

          <main class="bg-dark page landing-page" style={{ paddingTop: '50px' }}>
           
            <Searchbar ads={this.state.ads} />
           
            <Route exact path='/' render={() =>
              <HomePage />
            } />
            <Route exact path='/advertisement' render={() =>
              <AdList ads={this.state.ads} fetchHome= {this.fetchHome.bind(this)}/>
            } />
            <Route exact path='/project' render={() =>
              <ProjectList projects={this.state.projects} fetchProject={this.fetchProject.bind(this)}/>
            } />
            <Route path={`/advertisement/:id`} render={(props) =>
                <ProductDetail fetchHome={this.fetchHome.bind(this)} {...props} />
            } />
            <Route path={`/project/:id`} render={(props) =>
                <OneProject fetchProject={this.fetchProject.bind(this)} {...props}/>
            } />

          </main>



          <Footer />
        </BrowserRouter>
      </div>
    );
  }

}

//export default App;
