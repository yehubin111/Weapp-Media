// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginname: '',
    password: '',
    wronginfo: ''
  },
  toLogin() {
    if (this.data.loginname.trim() == '') {
      this.setData({
        wronginfo: '用户名不能为空'
      })
      return;
    }
    if (this.data.password.trim() == '') {
      this.setData({
        wronginfo: '密码不能为空'
      })
      return;
    }

    let account = wx.getStorageSync('account') ? wx.getStorageSync('account').split('|') : [];

    if (!account.find(v => v.split('@')[0] == this.data.loginname)) {
      this.setData({
        wronginfo: '该用户名未被注册'
      })
      return;
    }
    if (!account.find(v => v == `${this.data.loginname}@${this.data.password}`)) {
      this.setData({
        wronginfo: '密码错误'
      })
      return;
    }
    
    wx.showToast({
      title: '登录成功'
    });
    setTimeout(() => {
      wx.hideToast();
      wx.navigateTo({
        url: '../logs/logs'
      })
    }, 1000);
  },
  loginName(e) {
    this.setData({
      wronginfo: ''
    })
    this.setData({
      loginname: e.detail.value
    })
  },
  loginPswd(e) {
    this.setData({
      wronginfo: ''
    })
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})