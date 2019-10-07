const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username: { type: String },
	password: {
		type: String,
		// 使将密码在编辑的时候不会被查出来，显示的时候是看不见的
		select: false,
		set(val) {
			return require('bcrypt').hashSync(val,10)
		}
	},
})

module.exports = mongoose.model('AdminUser',schema)

// $2b$10$lddiimLwaO6iib6SbIN.ruYjMwboKYOB9th8wRlcUh.din1FUAAW2