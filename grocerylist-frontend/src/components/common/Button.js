import React, { Component } from 'react'

export class Button extends Component {
    render() {
        return (
        <React.Fragment>
            <button 
            onClick= {() => this.props.clickFunc()}
            id={this.props.id}
            >

            {this.props.buttonName}
            
            </button>
        </React.Fragment>
        )
    }
}
export default Button

// import React from "react";

// function Button(props) {
//     return (
//         <React.Fragment>
//             <button onClick={() =>
//                 this.props.onClick()}
//                 id={this.props.id}
//             >
//                 {/* {props.buttonName} */}
//             </button>
//         </React.Fragment>
//     )
// }
// export default Button;