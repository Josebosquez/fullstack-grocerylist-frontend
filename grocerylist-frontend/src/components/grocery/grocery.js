import React, { Component } from 'react'
import GroceryList from './groceryList'
import "./grocery.css"

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

            this.setState({
                list: allGroceries.data.payload
            })
        } catch (e) {
            console.log(e)
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
        if (this.state.inputBox.length === 0) {
            this.setState({
                error: true,
                errorMessage: "Cannot leave this empty",
            });
        } else {
            let checkIfWeBuyingExtra = this.state.list.findIndex(
                (item) =>
                    item.grocery.toLocaleLowerCase() ===
                    this.state.inputBox.toLocaleLowerCase()
            );
            if (checkIfWeBuyingExtra > -1) {
                this.setState({
                    error: true,
                    errorMessage: "We are not buying extra",
                });
            } else {
                try {
                    let createGrocery = await axios.post(`${URL}/grocery/create-grocery`, {
                        grocery: this.state.newArray
                    });

                    console.log(createGrocery)
                    let newArray = [
                        ...this.state.list, 
                        createGrocery.data.payload];
                    this.setState({
                        list: newArray,
                        newInput: "",
                    });

                } catch (e) {
                    console.log(e)
                }
            }
        }
    };

    handleDeleteById = async (_id) => {
        try {
            let deletedPath = await axios.delete(`${URL}/grocery/delete-grocery-by-id/${_id}`)
            let filteredArray = this.state.list.filter(
                (item) => item._id !== deletedPath.data.payload._id
            );
            this.setState({
                list: filteredArray
            })
        } catch (e) {
            console.log(e);
        }
    }

    handleDoneById = async (_id, isDone) => {
        //console.log(id, isDone);
        try {
            let todoIsDoneUpdated = await axios.put(
                `${URL}/grocery/update-grocery-by-id/${_id}`,
                {
                    isDone: !isDone,
                }
            );
            let updatedGroceryArray = this.state.list.map((item) => {
                if (item._id === todoIsDoneUpdated.data.payload._id) {
                    item.isDone = todoIsDoneUpdated.data.payload.isDone;
                }
                return item;
            });
            this.setState({
                list: updatedGroceryArray,
            });
        } catch (e) {
            console.log(e);
        }
    };

    handleEditById = async (id, newInput) => {
        try {
            let updateGrocery = await axios.put(
                `${URL}/grocery/update-grocery-by-id/${id}`,
                {
                    grocery: newInput,
                }
            );
            console.log(updateGrocery);
            let updatedGroceryArray = this.state.list.map((item) => {
                if (item._id === id) {
                    item.todo = updateGrocery.data.payload.grocery;
                }
                return item;
            });
            this.setState({
                list: updatedGroceryArray,
            });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div>
                <div className='input-form'>
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
                </div>

                <div>
                    <ul>
                        {this.state.list.map((item) => {
                            console.log(item)
                            return (
                                <GroceryList
                                    key={item._id}
                                    item={item}
                                    handleDeleteById={this.handleDeleteById}
                                    handleDoneById={this.handleDoneById}
                                    handleEditById={this.handleEditById}
                                    inputId={item._id}
                                />
                            )
                        })}
                    </ul>

                </div>
            </div>
        )
    }
}

export default grocery
