import React, { Component } from 'react'
import GroceryList from './groceryList'
import "./grocery.css"

import Header from "../header/header"

import axios from 'axios'

let URL = 'http://localhost:3001'

export class grocery extends Component {
    state = {
        list: [],
        inputBox: '',
        error: null,
        errorMsg: '',
    };

    async componentDidMount() {
        // console.log('1st')
        try {
            let allGroceries = await axios.get(`${URL}/grocery/get-all-groceries`)
            console.log(allGroceries)
            console.log('3rd')
        } catch (e) {

        }
    }

    handleOnChange = async (event) => {
        this.setState({
            inputBox: event.target.value,
            error: null,
            errorMsg: '',
        })
        console.log(this.state.inputBox)
    }

    handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log('submit')
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Header />
                <form onSubmit={this.handleOnSubmit}>

                    <input
                        name='inputBox'
                        type='text'
                        autoFocus
                        onChange={this.handleOnChange}
                        value={this.state.inputBox}
                        id='inputBox'
                    />
                    <button type="submit">Submit</button>
                </form>

                <GroceryList />
            </div>
        )
    }
}

export default grocery
