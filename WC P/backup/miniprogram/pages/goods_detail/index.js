// pages/goods_detail/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
   async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  handlePreviewImage(e){
    const urls= this.GoodsInfo.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current: urls[0],
      urls: urls,
    });
  },
  handleCartAdd(){
    let cart=wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      mask: true
    });
  }
})