# react-photo-gallery
基于React打造画廊
项目概览

预览地址：https://alpha-pluto.github.io/react-photo-gallery/

根据慕课网 Materliu老师的在线课程 React实战--打造画廊应用
 

发布项目到gh-pages
1、git步骤命令(运行命令前需要打包dist，运行npm run dist即可打包)

    git add dist
    git commit -m "add dist"
    git subtree push --prefix=dist origin gh-pages 
  
2、成功发布到gh-pages,打开gh-pages的预览地址，发现无法打开网页，app.js找不到。 

    解决方法： - 修改default.js中的publicPath:'/assets/' 为： `publicPath:'assets/'.
    
  修改index.html中的
  
     `<script type="text/javascript" src="/assets/app.js"></script>`
     
      为：
      
      `<script type="text/javascript" src="assets/app.js"></script>` 
      
      然后重复 git步骤 

3、图片都找不到
    我们在package.json文件中的scripts可以看到： 

    "copy": "copyfiles -f ./src/index.html ./src/favicon.ico ./dist", 这个脚本命令， 在脚本命令中加入 "./src/images"

    即

    "copy": "copyfiles -f ./src/index.html ./src/favicon.ico ./src/images ./dist"

    然后重复 git步骤
