// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    actorList: [],
    chudi: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var mid = options.id;

    // // 获取本地缓存 异步
    // var moviedata = wx.getStorage({
    //   key: '',
    //   success: function(res) {},
    // })
    // wx.request({
    //   url: '',
    //   method:"",
    //   dataType:"",
    //   success(){

    //   },
    //   fail:(){

    //   },
    //   complete(){

    //   }
    // })
    // 同步 获取本地缓存
    var moviedata = wx.getStorageSync(mid)
    if (moviedata) {
      // 获取到缓存 
      this.setData({
        movie: moviedata
      })
      wx.setNavigationBarTitle({
        title: moviedata.title,
      })
    } else {
      this.loadMovie(mid);
    }
  },

  //加载电影详情
  loadMovie: function(mid) {
    var self = this
    // 显示加载框
    wx.showLoading({
      title: '耐心等待加载···',
    })
    wx.showNavigationBarLoading()
    //发起请求
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + mid,
      method: "get",
      dataType: "json",
      header: {
        "content-type": "json"
      },
      success: function(res) {
        console.log(res.data)
        if (res.statusCode === 200) {
          self.setData({
            movie: res.data
          })
          wx.setNavigationBarTitle({
            title: res.data.title,
          })
          // 缓存电影数据
          wx.setStorage({
            key: mid,
            data: res.data,
          })
        }

      },
      fail: function(msg) {
        console.log("请求失败" + msg)
      },
      complete: function() { //请求完成 ，不论失败与成功
        //  隐藏加载框
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   * 小程序切换到后台的时候，每次调出都会执行onShow
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   * 不看这个页面的时候执行onHide
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var actorid = this.data.movie.casts[0].id;
    if (this.data.chudi) {
      this.data.chudi = false;

      if (this.data.actorList.length == 0) {
        wx.showLoading({
          title: '等待加载演员信息',
        })
        this.loadActor(actorid, 0);
        console.log(this.data.actorList)

      } else {
        wx.hideLoading()
      }
    }
  },
  // 加载演员的信息 递归的调用
  // 两个参数 演员的id 和计数器
  loadActor: function(actorid, i) {

    var self = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/celebrity/' + actorid,
      method: "get",
      dataType: "json",
      header: {
        "content-type": "json"
      },
      success: function(res) {
        if (res.statusCode === 200) {
          self.data.actorList.push(res.data)
        }
      },
      fail: function(err) {

      },
      complete: function() {
        if (i >= self.data.movie.casts.length - 1) {
          self.setData({
            // js中数据同步到前端页面
            actorList: self.data.actorList
          })
          wx.hideLoading()
        } else {
          i++;
          console.log(self.data.movie.casts[i].id)
          var acrotid = self.data.movie.casts[i].id;
          self.loadActor(acrotid, i);
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "非常好看的电影"
    }
  }
})