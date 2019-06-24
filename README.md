# crd-admin-template

本框架只适用于后台管理系统，手机端请移步。

本项目从 vue-element-admin分支permission-control https://github.com/PanJiaChen/vue-admin-template/tree/permission-control 进行修改，增加后台控制前端路由，增加tagviews标签页，


需了解 vue + vuex + vue-router + axios+ 基于element-ui前端组件,一个基于vue并感觉不错的表单生成工具  form-creater （可基于element-ui,iview的一系列组件）http://www.form-create.com/v2/

注意点：

      1、keep-alive 使用过程中不生效，首先vue文件的name必须和路由中的名称一致，区分大小写
        
      2、自己开发过程中，可以在main.js注释掉permission.js的引用，这样就会加载所有的路由，不用后台控制。
        
      3、路由、mock数据等最好在modules中分块进行编写，这样便于分类
