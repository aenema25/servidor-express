const { ObjectId } = require("mongodb")
const TicketsModel = require("../../models/ticketsModel")

class TicketsManager {
    getOne = (id) => TicketsModel.findOne({ "_id": new ObjectId(id) })
    create = (ticket) => TicketsModel.create(ticket)
    delete = (id) => TicketsModel.deleteOne({ _id: new ObjectId(id) })
}

module.exports = new TicketsManager()