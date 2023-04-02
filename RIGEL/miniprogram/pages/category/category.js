// pages/category/category.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat:[],
    product:[],
    cat_now:""
  },
  get_product_cat:function(e){
    let that=this
    that.setData({
      cat_now:e.currentTarget.dataset.name
    })
    that.get_product()
  },
  get_product:function(){
    let that=this
    db.collection('product').where({
      cat:that.data.cat_now
    }).get({
      success:function(res){
        //console.log(res,'cat success')
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        //console.log(res,'fail')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    //console.log(options,'cat success')
    db.collection('cat').get({
      success:function(res){
        //console.log(res,'cat success')
        that.setData({
          cat:res.data
        })
      },
      fail:function(res){
        //console.log(res,'cat fail')
      }
    })
    db.collection('product').where({
      cat:"数学"
    }).get({
      success:function(res){
        //console.log(res,'product success')
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        //console.log(res,'product fail')
      }
    })
  },
  onReachBottom(){
    console.log(seeseesee)
  },
  onShareAppMessage: function () {

  }
})