import { Component } from "react";
import AppBoardToDo from "../appBoardToDo/AppBoardToDo";
import AppBoardInProgress from "../appBoardInProgress/AppBoardInProgress";
import AppBoardDone from "../appBoardDone/AppBoardDone";

import "./appBoard.sass"

class AppBoard extends Component {
    render() {
        const {bgColors, users, tasks} = this.props

        return (
            <div className="board">
                <AppBoardToDo
                    bgColors={bgColors}
                    users={users}
                    tasks={tasks}
                    onStatusChange={this.props.onStatusChange}
                     />

                <AppBoardInProgress
                    bgColors={bgColors}
                    users={users}
                    tasks={tasks}
                    onStatusChange={this.props.onStatusChange}
                     />

                <AppBoardDone
                    bgColors={bgColors}
                    users={users}
                    tasks={tasks}
                    onStatusChange={this.props.onStatusChange}
                     />
            </div>
        )
    }
}

export default AppBoard