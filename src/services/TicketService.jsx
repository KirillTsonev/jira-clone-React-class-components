class TicketService {
    getResource = async (url) => {
        let res = await fetch(url)
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }

    postTask = async (data) => {
        await fetch("https://6348588d0b382d796c6fde8e.mockapi.io/tasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    }

    deleteTask = async (id) => {
        await fetch(`https://6348588d0b382d796c6fde8e.mockapi.io/tasks/${id}`, {
            method: "DELETE"
        })
    }

    getTasks = async () => {
        const res = await this.getResource(`https://6348588d0b382d796c6fde8e.mockapi.io/tasks/`)
        return res
    }
}

export default TicketService