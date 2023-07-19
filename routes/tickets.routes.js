const express = require('express');
const router = express.Router();

const tickets_controller = require("../controllers/tickets.controller")

/* GET ticket by id. */
router.get('/:id', tickets_controller.get_ticket);
/* POST ticket (create a ticket). */
router.post('/create', tickets_controller.create_ticket);
/* DELETE ticket by id. */
router.delete('/:id', tickets_controller.delete_ticket);

module.exports = router;