class TicketService {
    getResource = async (url) => {
        let res = await fetch(url)
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    getTasks = async (id) => {
        const res = await this.getResource(`https://jsonplaceholder.typicode.com/todos/${id}`)
        return res
    }

    getUsers = async (id) => {
        const res = await this.getResource(`https://jsonplaceholder.typicode.com/users/${id}`)
        return res.name.replace(/[a-z ]/g, "")
    }
}

export default TicketService