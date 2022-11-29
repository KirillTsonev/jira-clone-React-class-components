import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import AppTicketList from "../appTicketList/AppTicketList";
import AppBoard from "../appBoard/AppBoard";
import TicketService from "../../services/TicketService";

import "./app.sass"

class App extends Component {
	state = {
		tasks: [],
		darkTheme: false,
	}

	ticketService = new TicketService()

	onTaskRequest = (res) => {
		this.setState(() => ({
			tasks: res,
		}))
	}

	componentDidMount() {
		if (localStorage.getItem("darkTheme") && localStorage.getItem("darkTheme").length === 4) {
			this.setState(() => ({
				darkTheme: true
			}))
		}
		this.ticketService.getTasks()
			.then(this.onTaskRequest)
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

		setTimeout(() => {
			this.ticketService.putTask(id + 1, this.state.tasks[id])
		}, 500); 
	}

	onChangeTheme = () => {
		this.setState(({ darkTheme }) => ({
			darkTheme: !darkTheme
		}))
		localStorage.setItem("darkTheme", !this.state.darkTheme)
	}

	onTaskPost = (text) => {
		this.setState(({tasks}) => ({
			tasks: [...tasks, text]
		}))
		setTimeout(() => {
			this.ticketService.postTask(text)
		}, 500);
	}

	onTaskDelete = (id) => {
		const arr = this.state.tasks.filter(a => a.id !== id)
		this.setState(() => ({
			tasks: arr
		}))
		setTimeout(() => {
			this.ticketService.deleteTask(id)
		}, 500);
	}

	onTaskEdit = (id, title, body) => {
		const arr = this.state.tasks.map((a, i) => {
			if (i === id) {
				return {...a, title: title, body: body}
			} else {
				return {...a}
		}})

		this.setState (() => {
			return {tasks: arr}
		})

		setTimeout(() => {
			this.ticketService.putTask(id + 1, this.state.tasks[id])
		}, 500); 
    }

	render() {
		const {tasks, darkTheme} = this.state
		const toggle = tasks.map(a => a = a.toggle)

		return (
			<div className={`container ${this.state.darkTheme ? "darkThemeAll" : ""}`}>
				<AppHeader>
					<h2 className="container__header">Task List</h2>
				</AppHeader>

				<AppTicketList
					tasks={tasks}
					toggle={toggle}
					onStatusChange={this.onStatusChange}
					onTaskPost={this.onTaskPost}
					onTaskDelete={this.onTaskDelete}
					onTaskEdit={this.onTaskEdit}
					onChangeTheme={this.onChangeTheme} />

				<AppHeader>
					<h2 className="container__header">Board</h2>
				</AppHeader>

				<AppBoard 
					darkTheme={darkTheme}
					tasks={tasks}
					onStatusChange={this.onStatusChange} />
			</div>
		);
	}
}

export default App;