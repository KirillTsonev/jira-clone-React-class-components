import { Component } from "react";
import "./appHeader.sass"

class AppHeader extends Component {
    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default AppHeader