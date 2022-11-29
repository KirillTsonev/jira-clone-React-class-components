import { Component } from "react";
import trash from "../../images/trash.png";
import pencil from "../../images/pencil.png"
import cancel from "../../images/x.png"
import green from "../../images/green-check.png"

// import logo from "../../images/theme-light-dark.svg"
import "./appTicketList.sass"

class AppTicketList extends Component {
    state = {
        title: "",
        body: "",
        status: "To do",
        id: null,
        toggleEdit: [],
        toggleDelete: [],
        counter: 1,
        ballLeft: false,
    }

    componentDidMount() {
        if (localStorage.getItem("counter")) {
            this.setState(() => ({
                counter: +localStorage.getItem("counter")
            }))
        }
        if (localStorage.getItem("ballLeft") && localStorage.getItem("ballLeft").length === 4) {
            this.setState(() => ({
                ballLeft: true
            }))
        } else {
            this.setState(() => ({
                ballLeft: false
            }))
        }
        setTimeout(() => {
            this.setState(() => ({
                toggleEdit: this.props.toggle,
                toggleDelete: this.props.toggle,
            }))
        }, 500);
    }

    onNextPressed = () => {
        this.setState(() => ({
            counter: this.state.counter + 1
        }))
        localStorage.setItem("counter", `${this.state.counter + 1}`)
    }

    onTutorialPressed = () => {
        this.setState(() => ({
            counter: 1
        }))
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
        const { title, body, status } = this.state
        this.props.onTaskPost({ title, body, status })
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
        const { title, body, id } = this.state
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

    onChangeTheme = () => {
        this.props.onChangeTheme()
        this.setState(() => ({
            ballLeft: !this.state.ballLeft
        }))
        localStorage.setItem("ballLeft", !this.state.ballLeft)
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
                            style={this.state.toggleEdit[i] ? { "display": "none" } : { "display": "block" }}
                            onClick={() => this.onPencilPress(i)} />

                        <img alt="cancel"
                            src={cancel}
                            style={this.state.toggleEdit[i] ? { "display": "block" } : { "display": "none" }}
                            onClick={() => this.onCancelPress(i)} />

                        <img alt="trash"
                            src={trash}
                            style={this.state.toggleDelete[i] ? { "display": "none" } : { "display": "block" }}
                            onClick={() => this.onDeletePress(i)} />

                        <div className="deleteContainer">
                            <img alt="confirm"
                                src={green}
                                style={this.state.toggleDelete[i] ? { "display": "block" } : { "display": "none" }}
                                onClick={() => this.onTaskDelete(a.id)} />
                            <img alt="cancel"
                                src={cancel}
                                style={this.state.toggleDelete[i] ? { "display": "block" } : { "display": "none" }}
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
                <div className="modal__container">
                    <div className={this.state.counter === 1 ? "modal__hint1 fadeIn" : "modal__hint1 fadeOut"}>
                        <div className="modal__hint1-text">
                            Enter your task's title and body in the fields above and press "Add task". That saves your task into a database so it's always available when you open this website.
                        </div>

                        <div className="modal__btn-container">
                            <div className="modal__btn-btn" onClick={() => this.onNextPressed()}>Next</div>
                        </div>
                    </div>


                    <div className={this.state.counter === 2 ? "modal__hint2 fadeIn" : "modal__hint2 fadeOut"}>
                        <div className="modal__hint2-text">
                            Click on the status of your task to change it from "To do" to "In progress" to "Done".<br></br>When you change it here, it also changes on the board below. You can also change the task status by clicking the task on the board.
                        </div>

                        <div className="modal__btn-container">
                            <div className="modal__btn-btn" onClick={() => this.onNextPressed()}>Next</div>
                        </div>
                    </div>

                    <div className={this.state.counter === 3 ? "modal__hint3 fadeIn" : "modal__hint3 fadeOut"}>
                        <div className="modal__hint3-text">
                            Use these buttons to edit or delete your tasks.
                        </div>

                        <div className="modal__btn-container">
                            <div className="modal__btn-btn" onClick={() => this.onNextPressed()}>Next</div>
                        </div>
                    </div>

                    <div className={this.state.counter === 4 ? "modal__hint4 fadeIn" : "modal__hint4 fadeOut"}>
                        <div className="modal__hint4-text">
                            Your tasks are sorted based on their status on the board below. Click on a task to progress its status to the next stage.
                        </div>

                        <div className="modal__btn-container">
                            <div className="modal__btn-btn" onClick={() => this.onNextPressed()}>Next</div>
                        </div>
                    </div>
                </div>

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

                    <div className="buttonContainer">
                        <div className="button"
                            onClick={this.state.title ? () => this.onTaskPost(this.state) : null}
                            style={!this.state.toggleEdit.some(a => a === true) ? { "display": "block" } : { "display": "none" }} >Add Task</div>

                        <div className="button"
                            onClick={this.state.title ? () => this.onTaskEdit() : null}
                            style={!this.state.toggleEdit.some(a => a === true) ? { "display": "none" } : { "display": "block" }} >Edit task</div>

                        <div className="tutorial" onClick={() => this.onTutorialPressed()}>?</div>
                    
                        <div className="switch" onClick={() => this.onChangeTheme()}>
                            <div>🌞</div>

                            <div className={`switch__ball ${this.state.ballLeft ? "switch__ball-right" : "switch__ball-left"}`}></div>

                            <div>🌜</div>
                        </div>
                    </div>
                </div>

                <div>
                    {this.renderTasks(this.props.tasks)}
                </div>
            </div>
        )
    }
}

export default AppTicketList