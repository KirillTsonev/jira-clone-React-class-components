import AppHeader from "../appHeader/AppHeader";
import AppTicketList from "../appTicketList/AppTicketList";
import AppBoard from "../appBoard/AppBoard";
import { Component } from "react";
import TicketService from "../../services/TicketService";
// import logo from "../../images/theme-light-dark.svg"

class App extends Component {
	state = {
		tasks: [],
		darkTheme: false,
	}

	ticketService = new TicketService()

	componentDidMount() {
		this.ticketService.getTasks()
			.then(this.onTaskRequest)
	}

	onTaskRequest = (res) => {
		this.setState(() => ({
			tasks: [...res],
		}))
	}

	onStatusChange = (id) => {
		this.setState(({tasks}) => {
			const arr = tasks.map((a, i) => {
				if (i === id && a.status === "To do") {
					return {...a, status: "In progress"}
				} else if (i === id && a.status === "In progress") {
					return {...a, status: "Done"}
				} else {
					return {...a}
				}
			})
			return {tasks: arr}
		})
	}

	// changeTheme = () => {
	// 	this.setState(({ darkTheme }) => ({
	// 		darkTheme: !darkTheme
	// 	}))
	// 	if (this.state.darkTheme) {

	// 	}
	// }

	onTaskPost = (text) => {
		this.setState(({tasks}) => ({
			tasks: [...tasks, text]
		}))
		this.ticketService.postTask(text)
	}

	onTaskDelete = (id) => {
		const arr = this.state.tasks.filter(a => a.id !== id)
		this.setState(() => ({
			tasks: arr
		}))
		this.ticketService.deleteTask(id)
	}

	render() {
		const {bgColors, users, tasks} = this.state

		return (
			<div className={`container ${this.state.darkTheme ? "darkTheme" : null}`}>
				<AppHeader>
					<h2 className="container__header">Task List</h2>
				</AppHeader>

				{/* <img src={logo} alt="Theme changer" style={{"width": "50px"}} onClick={this.changeTheme}></img> */}

				<AppTicketList
					bgColors={bgColors}
					users={users}
					tasks={tasks}
					onStatusChange={this.onStatusChange}
					onTaskPost={this.onTaskPost}
					onTaskDelete={this.onTaskDelete} />

				<AppHeader>
					<h2 className="container__header">Board</h2>
				</AppHeader>

				<AppBoard 
					bgColors={bgColors}
					users={users}
					tasks={tasks}
					onStatusChange={this.onStatusChange}/>
			</div>
		);
	}
}

export default App;