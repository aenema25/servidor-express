class TicketsService {
    constructor(manager) {
        this.manager = manager
    }
    getOne = (id) => this.manager.getOne(id)
    create = (ticket)=> this.manager.create(ticket)
    delete = (id) => this.manager.delete(id)
}

module.exports= TicketsService