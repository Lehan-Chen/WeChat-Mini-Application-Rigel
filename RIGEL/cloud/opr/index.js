// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.action=="submit") {
    return await cloud.database().collection("product").doc(event.id)
    .update({
      data:{
        comment:event.comment
      }
    })
    .then(res=>{
      console.log("cf yes",res);
      return res;
    })
    .catch(res=>{
      console.log("cf no",res);
      return res;
    })
  }
}