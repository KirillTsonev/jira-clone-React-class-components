import { Component } from "react";
import trash from "../../images/trash.png";

import "./appTicketList.sass"

class AppTicketList extends Component {
    state = {
        title: "",
        body: "",
        status: "To do",
    }

    onStatusChange = (id) => {
        this.props.onStatusChange(id)
    }

    onTaskDelete = (id) => {
        this.props.onTaskDelete(id)
    }

    onTaskPost = () => {
        this.props.onTaskPost(this.state)
        this.setState(() => ({
            title: "",
            body: "",
        }))
    }

    onTitleChange = (text) => {
        this.setState(() => ({
            title: text
        }))
    }

    onBodyChange = (text) => {
        this.setState(() => ({
            body: text
        }))
    }

    renderTasks = (arr) => {
        const tasks = arr.map((a, i) => {
            return (
                <div 
                    key={i}
                    className="ticket__list__item" 
                    onClick={() => this.onStatusChange(i)} >

                    <div className="ticket__list__item-title">
                        {a.title}
                    </div>

                    <div>
                        {a.body}
                    </div>

                    <div>
                        {a.status}
                    </div>

                    <img alt="trash"
                        src={trash}
                        style={{"width": "25px", "cursor": "pointer"}}
                        onClick={() => this.onTaskDelete(a.id)} />
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
                <div className="button" onClick={this.state.title ? () => this.onTaskPost(this.state) : null}>Add task</div>

                <form onSubmit={this.state.title ? () => this.onTaskPost(this.state) : null}>
                    <input type="text" 
                        name="title" 
                        className="titleText" 
                        placeholder="Task title" 
                        onChange={(e) => this.onTitleChange(e.target.value)} 
                        value={this.state.title} />
                    
                    <input type="text" 
                        name="body" 
                        className="titleBody" 
                        placeholder="Task body" 
                        onChange={(e) => this.onBodyChange(e.target.value)}
                        value={this.state.body} />
                </form>

                <div>
                    {this.renderTasks(this.props.tasks)}
                </div>
            </div>
        )
    }
}

export default AppTicketList