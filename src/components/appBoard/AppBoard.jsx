import { Component } from "react";

import "./appBoard.sass"

class BoardStatus extends Component {
    onStatusChange = (id) => {
        this.props.onStatusChange(id)
    }

    renderTasks = (arr) => {
        const tasks = arr.map((a, i) => {
            if (a.status === this.props.status) {
                return (
                    <div
                        key={i}
                        onClick={() => this.onStatusChange(i)}
                        className="board__column__item">
    
                        <div className="board__column__item-title">{a.title}</div>

                        <div className="board__column__item-body">{a.body}</div>
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
                    <h2 className="board__column__heading">{this.props.status}</h2>

                    {this.renderTasks(this.props.tasks)}
                </div>
            </>
        )
    }
}

class AppBoardToDo extends BoardStatus {}
class AppBoardInProgress extends BoardStatus {}
class AppBoardDone extends BoardStatus {}

class AppBoard extends Component {
    render() {
        const {tasks} = this.props

        return (
            <div className="board">
                <AppBoardToDo
                    tasks={tasks}
                    status={"To do"}
                    onStatusChange={this.props.onStatusChange}
                     />

                <AppBoardInProgress
                    tasks={tasks}
                    status={"In progress"}
                    onStatusChange={this.props.onStatusChange}
                     />

                <AppBoardDone
                    tasks={tasks}
                    status={"Done"}
                    onStatusChange={this.props.onStatusChange}
                     />
            </div>
        )
    }
}

export default AppBoard