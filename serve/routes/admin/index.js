module.exports = app => {
	const express = require('express')
	// 合并参数
	const router = express.Router({
		mergeParams: true
	})
	// const req.Model = require('../../models/req.Model')
	router.post('/',async (req,res) => {
		const model = await req.Model.create(req.body)
		res.send(model)
	})
	// 修改详情
	router.put('/:id',async (req,res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
		res.send(model)
	})
	// 删除接口(后端接口)
	router.delete('/:id',async (req,res) => {
		await req.Model.findByIdAndDelete(req.params.id,req.body)
		res.send({
			success: true
		})
	})
	// 创建分类
	router.get('/',async (req,res) => {
		const queryOptions = {}
		if (req.Model.modelName === 'Category') {
			queryOptions.populate = 'parent'
		}
		const items = await req.Model.find().setOptions(queryOptions).limit(10)
		res.send(items)
	})
	
	// 获取详情接口（后端的）
	router.get('/:id',async (req,res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	app.use('/admin/api/rest/:resource',async(req,res,next) => {
		const modelName = require('inflection').classify(req.params.resource)
		// 表示在请求对象中挂载一个model
		req.Model = require(`../../models/${modelName}`)
		next()
	},router)
}