import { request } from "../../request/index.js";
// pages/goods_list/index.js
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  QuertParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QuertParams.cid=options.cid;
    this.getGoodsList();
  },
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QuertParams});
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QuertParams.pagesize);
    console.log(this.totalPages);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh();
  },
  handleTabsItemChange(e){
    const{index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  onReachBottom(){
    if(this.QuertParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '暂无更多'
      });
    }else{
      this.QuertParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPulldownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QuertParams.pagenum=1;
    this.getGoodsList();
  }
})