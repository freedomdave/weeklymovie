// pages/weeklymoive/weeklymoive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id: 1420080,
        name:"悲惨世界",
        desc:"这是一部悲剧的电影",
        moivetype:"爱情",
        img:"bcsj.jpg",
        tuijian:false
      },
      {
        id: 25765735,
        name: "金刚狼",
        desc: "这是一部科幻的电影",
        moivetype: "科幻",
        img: "jgl.jpg",
        tuijian: false
      },
      {
        id: 1297574,
        name: "英雄本色",
        desc: "这是一动作",
        moivetype: "警匪",
        img: "yxbs.jpg",
        tuijian: true
      },
      {
        id: 1292722,
        name: "泰坦尼克号",
        desc: "这是一部悲剧的电影",
        moivetype: "爱情",
        img: "ttnk.jpg",
        tuijian: false
      },
    ],
    num:0
  },
  changeNum:function(){
    this.setData({num:2})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeNum()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})