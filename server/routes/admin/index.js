module.exports = app =>{

  const express = require("express")

  const AdminUser = require("../../models/AdminUser")


  const router = express.Router({
    mergeParams:true
  })


  // const Category = require("../../models/Category")

  // 设置成动态的:resource



  router.post("/",async (req,res) =>{


    // 创建一个异步任务 用await去等待他完成再继续进行。
    // 这里相当于一个Model.create去创建一条document插入进去一个model里面
    const model = await req.Model.create(req.body)
    res.send(model)

  })

  router.get("/",async (req,res)=>{

    const queryOption = {}

    if(req.Model.modelName === "Category")
    {
      queryOption.populate = "parent"
    } 

    const items = await req.Model.find().setOptions(queryOption).limit(100)
    res.send(items)
  })

  
  router.put("/:id",async (req,res) => {

    const item = await req.Model.findByIdAndUpdate(req.params.id,req.body)

    res.send(item)

    // const item = await Category.update({"_id":req.params.id},{$set:{name:req.body.name}},(err,res) => {

      // if(err){
      //   console.log(err)
      // }else{
      //   console.log("Res:"+res)
      //   respond.send(res)
      // }


    // })

  })

  router.get("/:id",async (req,res) => {

    const model = await req.Model.findById(req.params.id)
    res.send(model)

  })

  router.delete("/:id",async (req,res) =>{

    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success:true
    })
  })

  const auth = require("../../middleware/auth")
  const resource = require("../../middleware/resource")

  app.use("/admin/api/rest/:resource",auth(),resource(),router)


  const multer = require("multer")
  const upload = multer({
    dest:__dirname + "/../../uploads"
  })

  app.post("/admin/api/upload",auth(),upload.single("file"),async (req,res)=>{
    
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })



  // 登录接口
  app.use("/admin/api/login",async (req,res) =>{


  
    // 通过结构赋值拿到username和password
    let {username,password} = req.body

    // 拿到管理员的模型
  
    // 1.查询id 是否存在 然后返回

    // 我们默认在模型中的password字段的select的属性设置为false，所以是取不出的，所以我们这里要设置一下select('+password')
    const doc = await AdminUser.findOne({username}).select("+password")

    // 2.假如不存在 则返回状态码 422 然后给个message
    assert(doc,422,"用户不存在")

    // if(!doc){
    //   return  res.status(422).send({
    //     message:"用户不存在"
    //   })
    // }

    // 3.校验密码
    const isValid = require("bcryptjs").compareSync(password,doc.password)

    if(!isValid){
      return res.status(422).send({
        message:"密码错误"
      })
    }


    // jsonwebtoken 返回token


    // 进行签名(token) 生成
    // jwt.sign(加密的信息是一个对象最好,加密的密钥)
    
    const token = jwt.sign({id:doc._id},app.get("secret"))

    res.send({token})


  })


  app.use(async (err,req,res,next) => {

    res.status(err.statusCode || 500).send({
      message : err.message
    })

    await next()
  })


  

  


}