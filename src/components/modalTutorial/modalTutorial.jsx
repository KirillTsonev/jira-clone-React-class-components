import { Component } from "react";
import "./modalTutorial.sass"

class ModalTutorial extends Component {
    state = {
        counter: 1
    }

    // onNextPressed = () => {
    //     this.setState(() => ({
    //         counter: this.state.counter + 1
    //     }))
    // }

    // componentDidMount() {

    // }

    render() {
        return (
            <div className="modal__container">
                <div className={this.state.counter === 1 ? "modal__hint1 fadeIn" : "modal__hint1 fadeOut"}>
                    <div className="modal__hint1-text">
                        Enter your task's title and body in the fields above and press "Add task". That saves your tasks into a database so they are always available when you open this website.
                    </div>

                    <div className="modal__hint1-btn" onClick={() => this.setState({counter: this.state.counter + 1 })}>Next</div>
                </div>

                <div className={this.state.counter === 2 ? "modal__hint2 fadeIn" : "modal__hint2 fadeOut"}>
                    <div className="modal__hint2-text">
                        Click on the status of your task to change it. The status changes from "To do" to "In progress" to "Done". When you change it here, it also changes in the board below, you can also change your task status by clicking it on the board.
                    </div>

                    <div className="modal__hint2-btn" onClick={() => this.setState({counter: this.state.counter + 1 })}>Next</div>
                </div>
            </div>
        )
    }
}

export default ModalTutorial