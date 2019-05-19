import React from 'react'
import pic1 from './images/image1.jpg'

export default class OneAd extends React.Component {
    render() {
        return (
            //<div >
                <div class="card clean-card text-left"><img class="img-thumbnail card-img-top w-100 d-block"
                    src={this.props.url} style={{ width: '328px', height: '220px'}} />
                    <div class="card-body">
                       
                        <h5>{this.props.title}</h5>
                        <p>{this.props.address}</p>
                        <p>Area: {this.props.area} square meter</p>
                    </div>
                </div>
            //</div>
        )
    }
}