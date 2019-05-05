//项目入口，程序文件

var express = require('express');

var app = express(); //创建app

//设置handlebars的视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars'); //将其配置为默认的视图引擎

//定义一个幸运饼干数组
var fortunes = [
    "1",
    "2",
    "3",
    "4",
    "5",
];
app.set('port',process.env.PORT || 3000); //设置端口地址，通过设置环境变量覆盖端口

app.use(express.static(__dirname + '/public')); //将static中间件加在所有路由之前
//设定路由,默认忽略了大小写或反斜杠，而且在匹配时不需要考虑查询字符串，将请求和响应对象传给这个函数
app.get('/',function(req,res){
    // res.type('text/plain');
    // res.send('Meadowlark Travel'); //express拓展的res.send代替Node的res.end
    res.render('home'); //视图引擎默认返回text/html的内容和状态码
});
app.get('/about',function(req,res){
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    var randomFortune = 
            fortunes[Math.floor(Math.random() *fortunes.length)];
    res.render('about', { fortune:randomFortune });
});

//可根据回调函数中参数的个数区分404和505，必须要放置在路由的后面，否则路由无法访问到，catch all处理器必须明确设定状态码
//定制404页面
app.use(function(req,res){  //app.use是Express添加中间件的一种方法，可当作处理所有没有路由匹配路径的处理器
    // res.type('text/plain'); //用res.type方法可以方便设置响应头
    res.status(404);        //res.set与res.status 代替Node的res.writeHEad
    // res.send('404 -Not found');
    res.render('404');
});

//定制505页面
app.use(function(error,req,res,next){
    console.error(err.stack);
    // res.type('text/plain');
    res.status(500);
    // res.send('500 -Server error');
    res.render('505');
});

//监听端口
app.listen(app.get('port'),function(){
    console.log('Exoress started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate');
});