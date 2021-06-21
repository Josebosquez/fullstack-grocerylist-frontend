import React, { Component } from 'react'
import Grocery from "./components/grocery/grocery"
import Header from "./components/header/header";
import "./App.css"



export class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <Grocery/>
      </div>
    )
  }
}

export default App

