module.exports = options => {

  const assert = require("http-assert")
  const jwt = require("jsonwebtoken")
  const AdminUser = require("../models/AdminUser")


  return async (req,res,next)=>{

    // 提取客户端传过来的authorization中的token,做字符串处理
    const token = String(req.headers.authorization || "").split(" ").pop()
    assert(token,401,"请先登录")


    // 使用jwt进行校验出原始数据
    const {id} = jwt.verify(token,req.app.get('secret'))
    assert(id,401,"请先登录")

    // 通过id去查找用户，如果用户存在则让用户继续后续请求
    req.user = await AdminUser.findById(id)

    assert(req.user,401,"请先登录")

    await next()

  }

}