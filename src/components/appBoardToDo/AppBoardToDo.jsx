import { Component } from "react";
import "./../appBoard/appBoard.sass"

class AppBoardToDo extends Component {
    onStatusChange = (id) => {
        this.props.onStatusChange(id)
    }

    renderTasks = (arr) => {
        const tasks = arr.map((a, i) => {
            if (a.completed === "To do") {
                return (
                    <div
                        key={a.id}
                        onClick={() => this.onStatusChange(i)}
                        className="board__column__item">
    
                        <div
                            style={this.props.bgColors[i]}
                            className="board__column__item-initials">{this.props.users[i]}</div>
    
                        <div className="board__column__item-title">{a.title}</div>
                    </div>
                )
            }
        })

        return (
            <div className="board__column__content">
                {tasks}
            </div>
        )

    }

    render() {
        return (
            <>
                <div className="board__column">
                    <h2 className="board__column__heading">To do</h2>

                    {this.renderTasks(this.props.tasks)}
                </div>
            </>
        )
    }
}

export default AppBoardToDo