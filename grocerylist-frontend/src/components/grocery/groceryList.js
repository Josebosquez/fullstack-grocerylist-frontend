import React, { Component } from 'react'
import "./groceryList.css"
import PropTypes from "prop-types";
import Button from "../common/Button"

export class groceryList extends Component {
    state = {
        canEdit: false,
        newInput: this.props.item.grocery
    };

    handleEditOnClick = () => {
        this.setState((prevState) => {
            return {
                canEdit: !prevState.canEdit,
            };
        })
    };

    handleEditOnChange = (event) => {
        this.setState({
            newInput: event.target.value
        })
    };

    handleEditOnSubmit = (id) => {
        this.handleEditOnClick();
        this.props.handleEditById(id,this.state.newInput)
    };

    render() {
        const { _id, grocery,isDone} = this.props.item;
        const { handleDeleteById, handleDoneById, inputID} = this.props;
        const {canEdit, newInput} = this.state;

        return (
            <div className="list-div">
                {canEdit ? (
                    <input 
                        type="text"
                        value = {newInput}
                        onChange={this.handleEditOnChange}
                        name='newInput'
                        id={inputID}
                        />
                ) : (
                    <li className={`li-style ${isDone && "li-style-isDone"}`}>{grocery}</li>
                )}

                {canEdit ? (
                    <Button
                        buttonName="Submit"
                        id="submit-button"
                        clickFunc={() => this.handleEditOnSubmit(_id)}
                    />
                ) : (
                        <Button
                            buttonName="Edit"
                            id="edit-button"
                            clickFunc={() => this.handleEditOnClick(_id)}
                        />
                )
            }

                <Button
                    buttonName="Done"
                    id="done-button"
                    clickFunc={() => handleDoneById(_id)}
                />

                <Button
                    buttonName="Delete"
                    id="delete-button"
                    clickFunc={() => handleDeleteById(_id)}
                />
            </div>
        )
    }
}

export default groceryList
groceryList.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteById: PropTypes.func.isRequired,
    handleDoneById: PropTypes.func.isRequired,
    handleEditById: PropTypes.func.isRequired,
};