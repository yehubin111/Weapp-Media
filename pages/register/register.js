// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wronginfo: '',
    loginname: '',
    password: '',
    passwordag: ''
  },
  toRegister() {
    console.log(this.data);
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
    if (this.data.passwordag.trim() == '') {
      this.setData({
        wronginfo: '重复密码不能为空'
      })
      return;
    }
    if (this.data.passwordag.trim() != this.data.password.trim()) {
      this.setData({
        wronginfo: '两次输入的密码不一致'
      })
      return;
    }

    let log = wx.getStorageSync('account');
    if (log && log.split('|').find(v => v.split('@')[0] == this.data.loginname)) {
      wronginfo: '该用户名已存在'
      return;
    }

    let logar = log ? log.split('|') : [];
    let str = `${this.data.loginname}@${this.data.password}`;
    logar.push(str);
    wx.setStorageSync('account', logar.join('|'));

    wx.showToast({
      title: '注册成功'
    });
    setTimeout(() => {
      wx.hideToast();
      wx.navigateBack({
        delta: 1
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
  loginPswdag(e) {
    this.setData({
      wronginfo: ''
    })
    this.setData({
      passwordag: e.detail.value
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