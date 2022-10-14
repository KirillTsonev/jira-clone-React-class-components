import { Component } from "react";
import trash from "../../images/trash.png";
import pencil from "../../images/pencil.png"
import cancel from "../../images/x.png"
import green from "../../images/green-check.png"

import "./appTicketList.sass"

class AppTicketList extends Component {
    state = {
        title: "",
        body: "",
        status: "To do",
        id: null,
        toggleEdit: [],
        toggleDelete: [],
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(() => ({
                toggleEdit: this.props.toggle,
                toggleDelete: this.props.toggle,
            }))
        }, 500);
    }

    // componentDidUpdate(_prevProps, prevState) {
    //     if (JSON.stringify(prevState.toggleEdit) !== JSON.stringify(this.state.toggleEdit) || JSON.stringify(prevState.toggleDelete) !== JSON.stringify(this.state.toggleDelete)) {
    //         setTimeout(() => {
    //             this.setState(() => ({
    //                 toggleEdit: this.props.toggle,
    //                 toggleDelete: this.props.toggle,
    //             }))
    //         }, 1000);
    //     }
    // }

    onStatusChange = (id) => {
        this.props.onStatusChange(id)
    }

    onTaskDelete = (id) => {
        const arr = this.state.toggleEdit.map(a => a = false)
        this.props.onTaskDelete(id)
        this.setState(() => ({
            toggleDelete: arr,
        }))
    }

    onTaskPost = () => {
        const {title, body, status} = this.state
        this.props.onTaskPost({title, body, status})
        this.setState(() => ({
            title: "",
            body: "",
            toggleEdit: this.state.toggleEdit.concat(false),
            toggleDelete: this.state.toggleDelete.concat(false),
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

    onPencilPress = (id) => {
        if (!this.state.toggleEdit.some(a => a === true)) {
            const arr = this.state.toggleEdit.map((a, i) => {
                if (i === id) {
                    return true
                } else {
                    return a
                }
            })
            this.setState(() => ({
                title: this.props.tasks[id].title,
                body: this.props.tasks[id].body,
                pencilPressed: true,
                id: id,
                toggleEdit: arr
            }))
        }
    }

    onTaskEdit = () => {
        const {title, body, id} = this.state
        const arr = this.state.toggleEdit.map(a => a = false)
        this.props.onTaskEdit(id, title, body)
        this.setState(() => ({
            title: "",
            body: "",
            pencilPressed: false,
            toggleEdit: arr,
        }))
    }

    onCancelPress = (id) => {
        const arrEdit = this.state.toggleEdit.map((a, i) => {
            if (i === id) {
                return false
            } else {
                return a
            }
        })
        const arrDelete = this.state.toggleEdit.map((a, i) => {
            if (i === id) {
                return false
            } else {
                return a
            }
        })
        this.setState(() => ({
            title: "",
            body: "",
            pencilPressed: false,
            toggleEdit: arrEdit,
            toggleDelete: arrDelete,
        }))
    }

    onDeletePress = (id) => {
        if (!this.state.toggleDelete.some(a => a === true)) {
            const arr = this.state.toggleDelete.map((a, i) => {
                if (i === id) {
                    return true
                } else {
                    return a
                }
            })
            this.setState(() => ({
                toggleDelete: arr
            }))
        }
    }

    renderTasks = (arr) => {
        const tasks = arr.map((a, i) => {
            return (
                <div 
                    key={i}
                    className="ticket__list__item" >

                    <div className="ticket__list__item-title" >
                        {a.title}
                    </div>

                    <div className="ticket__list__item-body" >
                        {a.body}
                    </div>

                    <div className="ticket__list__item-status"
                        onClick={() => this.onStatusChange(i)} >
                        {a.status}
                    </div>

                    <div className="ticket__list__item-icons" >
                        <img alt="pencil"
                            src={pencil}
                            style={this.state.toggleEdit[i] ? {"display": "none"} : {"display": "block"}}
                            onClick={() => this.onPencilPress(i)} />

                        <img alt="cancel"
                            src={cancel}
                            style={this.state.toggleEdit[i] ? {"display": "block"} : {"display": "none"}}
                            onClick={() => this.onCancelPress(i)} />

                        <img alt="trash"
                            src={trash}
                            style={this.state.toggleDelete[i] ? {"display": "none"} : {"display": "block"}}
                            onClick={() => this.onDeletePress(i)} />

                        <div className="deleteContainer">
                            <img alt="confirm"
                                src={green}
                                style={this.state.toggleDelete[i] ? {"display": "block"} : {"display": "none"}}
                                onClick={() => this.onTaskDelete(a.id)} />
                            <img alt="cancel"
                                src={cancel}
                                style={this.state.toggleDelete[i] ? {"display": "block"} : {"display": "none"}}
                                onClick={() => this.onCancelPress(i)} />
                        </div>
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
                <div className="taskHeader">
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

                    <div className="button" 
                        onClick={this.state.title ? () => this.onTaskPost(this.state) : null} 
                        style={!this.state.toggleEdit.some(a => a === true) ? {"display": "block"} : {"display": "none"}} >Add Task</div>

                    <div className="button"
                        onClick={this.state.title ? () => this.onTaskEdit() : null}
                        style={!this.state.toggleEdit.some(a => a === true) ? {"display": "none"} : {"display": "block"}} >Edit task</div>
                </div>

                <div>
                    {this.renderTasks(this.props.tasks)}
                </div>
            </div>
        )
    }
}

export default AppTicketList