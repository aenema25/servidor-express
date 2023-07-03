class CartService {
    constructor(manager) {
        this.manager = manager
    }
    get = () => this.manager.get
    create = () => this.manager.create
    update = () => this.manager.update
    delete = () => this.manager.delete
}

module.exports=  CartService