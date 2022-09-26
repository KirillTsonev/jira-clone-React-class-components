import AppHeader from "../appHeader/AppHeader";
import AppTicketList from "../appTicketList/AppTicketList";
import AppBoard from "../appBoard/AppBoard";
import { Component } from "react";
import TicketService from "../../services/TicketService";

class App extends Component {
	state = {
		taskId: 1,
		tasks: [],
		users: [],
		bgColors: [],
	}

	ticketService = new TicketService()

	onTaskId = () => {
		this.setState(({ taskId }) => ({
			taskId: taskId + 1
		}))
	}

	pickColor = () => {
		this.setState(({ bgColors }) => ({
			bgColors: [...bgColors, { "backgroundColor": `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})` }]
		}))
	}

	getInfo = (id) => {
		if (id < 11) {
			this.ticketService.getTasks(id)
				.then(this.onTaskRequest)
			this.ticketService.getUsers(id)
				.then(this.onUserRequest)
			this.onTaskId()
			this.pickColor()
		}
	}

	onTaskRequest = (res) => {
		this.setState(({tasks}) => ({
			tasks: [...tasks, {...res, completed: "To do"}]
		}))
	}

	onUserRequest = (res) => {
		this.setState(({users}) => ({
			users: [...users, res]
		}))
	}

	onStatusChange = (id) => {
		this.setState(({tasks}) => {
			const arr = tasks.map((a, i) => {
				if (i === id && a.completed === "To do") {
					return {...a, completed: "In progress"}
				} else if (i === id && a.completed === "In progress") {
					return {...a, completed: "Done"}
				} else {
					return {...a}
				}
			})
			return ({tasks: arr})
		})
	}

	render() {
		const {bgColors, users, tasks} = this.state

		return (
			<div className="container">
				<AppHeader>
					<h2 className="container__header">Ticket List</h2>
				</AppHeader>

				<AppTicketList
					bgColors={bgColors}
					users={users}
					tasks={tasks}
					onStatusChange={this.onStatusChange} />

				<div className="button" onClick={() => this.getInfo(this.state.taskId)}>Add task</div>

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