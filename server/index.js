const express = require("express")

const app = express()

// 引用跨域中间件
app.use(require("cors")())
// express4.6之前使用body-parser中间件去解析post请求中的body 而现在只需要使用express自带的.json方法中间件
app.use(express.json())


// 在我们app这个对象上设置一个变量
app.set("secret","liuxin2015")



// 开放图片的静态资源
app.use("/uploads",express.static(__dirname + "/uploads"))


require("./plugins/db/db")(app)
require("./routes/admin")(app)

app.listen(3000,() => {

  console.log("http://localhost:3000")

})