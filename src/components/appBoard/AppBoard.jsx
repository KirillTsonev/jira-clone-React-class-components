import { Component } from "react";

import "./appBoard.sass"

class BoardStatus extends Component {
    onStatusChange = (id) => {
        this.props.onStatusChange(id)
    }

    renderTasks = (arr) => {
        const tasks = arr.map((a, i) => {
            if (a.completed === this.props.status) {
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

class AppBoardToDo extends BoardStatus {}
class AppBoardInProgress extends BoardStatus {}
class AppBoardDone extends BoardStatus {}

class AppBoard extends Component {
    render() {
        const {bgColors, users, tasks} = this.props

        return (
            <div className="board">
                <AppBoardToDo
                    bgColors={bgColors}
                    users={users}
                    tasks={tasks}
                    status={"To do"}
                    onStatusChange={this.props.onStatusChange}
                     />

                <AppBoardInProgress
                    bgColors={bgColors}
                    users={users}
                    tasks={tasks}
                    status={"In progress"}
                    onStatusChange={this.props.onStatusChange}
                     />

                <AppBoardDone
                    bgColors={bgColors}
                    users={users}
                    tasks={tasks}
                    status={"Done"}
                    onStatusChange={this.props.onStatusChange}
                     />
            </div>
        )
    }
}

export default AppBoard