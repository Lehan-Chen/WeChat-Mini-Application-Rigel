const db=wx.cloud.database()

Page({
  data: {
    banner:[],
    //cat:[],
    //product:[],
    search:[]
  },
  search:function(e){
    let that=this
    //console.log(e)
    db.collection('product').where({
      name:e.detail.value
    }).get({
      success:function(res){
        that.setData({
          search:res.data
        })
        //console.log(that.data.search,'search success')
        if(that.data.search == ""){
          wx.showToast({
            title: '商品不存在',
            icon:"none"
          })
        }
      },
      fail:function(res){
        //console.log(res,'search fail')
      }
    })
  },

  onLoad: function() {
    let that=this
    db.collection('swiper').get({
      success:function(res){
        //console.log(res,'swiper success')
        that.setData({
          banner:res.data
        })
      },
      fail:function(res){
        //console.log(res,'swiper fail')
      }
    })
    /*db.collection('cat').get({
      success:function(res){
        console.log(res,'cat success')
        that.setData({
          cat:res.data
        })
      },
      fail:function(res){
        console.log(res,'cat fail')
      }
    })*/
    /*db.collection('product').get({
      success:function(res){
        console.log(res,'product success')
        that.setData({
          product:res.data
        })
      },
      fail:function(res){
        console.log(res,'product fail')
      }
    })*/
  },
  onShareAppMessage: function () {

  }
  

})
