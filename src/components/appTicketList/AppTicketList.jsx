import { Component } from "react";

import "./appTicketList.sass"

class AppTicketListItem extends Component {
    onStatusChange = (id) => {
        this.props.onStatusChange(id)
    }

    renderTasks = (arr) => {
        const tasks = arr.map((a, i) => {
            return (
                <div 
                    key={a.id}
                    className="ticket__list__item" 
                    onClick={() => this.onStatusChange(i)} >

                    <div 
                        style={this.props.bgColors[i]}
                        className="ticket__list__item-initials">
                            {this.props.users[i]}
                    </div>

                    <div className="ticket__list__item-title">
                        {a.title}
                    </div>

                    <div className="ticket__list__item-status">
                        {this.props.tasks[i].completed}
                    </div>
                </div>
            )
        })

        return (
            <div className="ticket__list">
                {tasks}
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.renderTasks(this.props.tasks)}
            </div>
        )
    }
}

export default AppTicketListItem