const { Controller, Response } = require("pepesan");
const f = require("../utils/Formatter");

module.exports = class BotController extends Controller {

    async status(request) {
      return this.reply("")
    }

}