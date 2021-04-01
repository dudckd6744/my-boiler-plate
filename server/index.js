const express = require("express")
const db = require("mongoose");
const config =require("./config/key")
const cors = require("cors");
const cookieparser = require("cookie-parser");

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
} 

const app = express();

const PORT = 5000;
// 애플리케이션 / json 유형 포스트 데이터의 구문 분석 지원
app.use(express.json());
//애플리케이션 / x-www-form-urlencoded 포스트 데이터 파싱 지원
app.use(express.urlencoded({extended:true}));
//다른 포트 도메인으로부터 서버 클라이언트 요청가능하게
app.use(cors(corsOptions));
app.use(cookieparser());
//데이터베이스 연결
db.connect(config.mongoURI,{
    useUnifiedTopology:true, useNewUrlParser:true,
    useCreateIndex:true
})
.then(()=>console.log("MongoDB Connected..."))
.catch(err =>console.log(err))

//routes
app.use("/api/users",require("./router/user"))

app.get("/",(req,res) => {
    res.send("hellow")
})

app.listen(PORT, ()=>console.log(`Example server listening on ${PORT}`))