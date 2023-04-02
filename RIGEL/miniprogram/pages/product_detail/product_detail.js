// pages/product_detail/product_detail.js
const db=wx.cloud.database()
let ID=""
let content=false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_name:"",
    product_src:[],
    //product_price:0,
    product_detail:"",
    //product_num:"",
    product_dt_src:"",
    id:"",
    product_pdf:"",
    product_com:"",
    comment:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    ID=options.id
    //console.log(ID,'receive product id')
    db.collection('product').doc(ID).get({
      success:function(res){
        //console.log(res,'receive product dt')
        that.setData({
          product_src:res.data.src,
          product_name:res.data.name,
          //product_num:res.data.num,
          //product_price:res.data.price,
          product_detail:res.data.detail,
          product_dt_src:res.data.product_dt_src,
          product_pdf:res.data.pdf,
          id:res.data._id,
          comment:res.data.comment,
          product_com:res.data.comment
        })
      },
      fail:function(res){
        //console.log(res,'fail product dt')
      }
    })
  },
  getComment(e){
    content=e.detail.value;
    //console.log(content)
  },
  submit(){
    if(content.length<4)
    {
      wx.showToast({
        icon:"none",
        title: '评论字数过少'
      })
      return
    }
    let commentItem={}
    //commentItem.name="hahaha"
    commentItem.content=content
    let arr=this.data.comment
    arr.push(commentItem)
    //console.log("renewed",arr)
    wx.cloud.callFunction({
      name:"opr",
      data:{
        action:"submit",
        id:ID,
        comment:arr
      }
    }).then(res=>{
        //console.log("post ok",res)
        this.setData({
          comment:arr
        })
    }).catch(res=>{
        //console.log("post nok",res)
    })
  },
  onShareAppMessage: function () {

  }
})