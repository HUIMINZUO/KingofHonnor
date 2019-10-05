const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	name: { type: String },
	avatar: { type: String },
	title: { type: String },
	categories: [{ type: mongoose.SchemaTypes.ObjectId,ref: 'Category' }],
	// 角色的评分
	scores: {
		difficult: { type: Number },
		skills: { type: Number },
		attack: { type: Number },
		survive: { type: Number },
	},
	// 多个技能
	skills: [{
		icon: { type: String },
		// 技能的名称
		name: { type: String },
		// 技能介绍
		description: { type: String },
		// 温馨提示
		tips: { type: String },
	}],
	// 装备（顺风出装-items1，逆风出装-items2）
	items1: [{ type: mongoose.SchemaTypes.ObjectId,ref: 'Item' }],
	items2: [{ type: mongoose.SchemaTypes.ObjectId,ref: 'Item' }],
	// 使用技巧
	usageTips: { type: String },
	// 对抗技巧
	battleTips: { type: String },
	// 团战思路
	teamTips: { type: String },
	// 英雄关系（目前做一个就好了）
	partners: [{
		hero: { type: mongoose.SchemaTypes.ObjectId,ref: 'Hero' },
		description: { type: String },
	}],
})

module.exports = mongoose.model('Hero',schema)