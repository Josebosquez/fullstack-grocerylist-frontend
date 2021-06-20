import React, { Component } from 'react'
import "./groceryList.css"

import Button from "../common/Button"


export class groceryList extends Component {
    render() {
        return (
            <div className="buttons">
                <Button
                    buttonName="Edit"
                    id="edit-button"
                // clickFunc={() => handleDeleteById(_id)}
                />

                <Button
                    buttonName="Delete"
                    id="delete-button"
                // clickFunc={() => handleDeleteById(_id)}
                />

                <Button
                    buttonName="Done"
                    id="done-button"
                // clickFunc={() => handleDeleteById(_id)}
                />

            </div>
        )
    }
}

export default groceryList
