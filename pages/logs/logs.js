//logs.js
const util = require('../../utils/util.js')

const audio = wx.createInnerAudioContext();
audio.autoplay = false;
Page({
  data: {
    audioList: [{
      image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT.jpg?max_age=2592000',
      audiourl: 'http://isure.stream.qqmusic.qq.com/C400003KtYhg4frNXC.m4a?vkey=B9A64B4E65A847E61EA283E82A7A437249DB670A2C70AE418F2BEF368645F5E62C7A841881D06C65E28143A412CD9A4775DBC871814F4561&guid=6570153517&uin=0&fromtag=66',
      name: '枫',
      singer: '周杰伦',
      count: 0,
      musicindex: 1
    }, {
        image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001Gikfw1MiLRm.jpg?max_age=2592000',
        audiourl: 'http://isure.stream.qqmusic.qq.com/C4000033N6Jr4DvOl9.m4a?vkey=81DDEF83FD7C8C1C0882E911CE5119017F2D0A2A9E171E6CF5942D79E223A61B83818ADDF286A3B5295DA3F08E9D980A79CF0A50C46273BA&guid=6570153517&uin=0&fromtag=66',
      name: '不再犹豫',
      singer: 'BEYOND',
      count: 0,
      musicindex: 2
    }, {
        image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000027Csjy1VidOC.jpg?max_age=2592000',
        audiourl: 'http://isure.stream.qqmusic.qq.com/C4000049C3wC0AveAU.m4a?vkey=EC1B984D0C38854843BFBF07F7D177C6C7055AAF8241155730F60CAD1DCAB068EF1B0A76C7D8DE19DB1470DB2D07639702DD8ECEDC7783B9&guid=6570153517&uin=0&fromtag=66',
      name: '往后余生',
      singer: '李贰叁',
      count: 0,
      musicindex: 3
    }],
    disaudio: {
      image: '',
      audiourl: '',
      name: '',
      singer: '',
      count: ''
    },
    musicindex: 0,
    isplay: false
  },
  selMusic(obj) {
    this.setData({
      'disaudio.image': obj.image
    })
    this.setData({
      'disaudio.name': obj.name
    })
    this.setData({
      'disaudio.audiourl': obj.audiourl
    })
    this.setData({
      'disaudio.singer': obj.singer
    })
    this.setData({
      'disaudio.count': obj.count
    })
    this.setData({
      'musicindex': obj.musicindex - 1
    })

    audio.src = this.data.disaudio.audiourl;
  },
  onLoad: function() {
    let ado = this.data.audioList[this.data.musicindex];
    // 默认选择列表第一项
    this.selMusic(ado);

    audio.onPlay(() => {
      console.log('开始播放');
      this.setData({
        isplay: true
      })
    })
    audio.onPause(() => {
      console.log('暂停播放');
      this.setData({
        isplay: false
      })
    })
    audio.onEnded(() => {
      console.log(`${this.data.disaudio.name}放完了`);
      // 播放次数加一
      let count = this.data.disaudio.count;
      count++;
      let oc = `audioList[${this.data.musicindex}].count`;

      this.setData({
        [oc]: count
      })

      // 切换下一首歌
      this.musicNext();
    })
    audio.onError((res) => {
      console.log(res.errMsg);
      console.log(res.errCode);
    })
  },
  musicNext() {
    let mindex = this.data.musicindex;
    mindex++;
    // 如果到达最后一首就跳回第一首
    if (mindex == this.data.audioList.length) {
      mindex = 0;
    }

    this.setData({
      musicindex: mindex
    })

    let ado = this.data.audioList[this.data.musicindex];

    audio.pause();
    // 默认选择列表第一项
    this.selMusic(ado);
    audio.play();
  },
  toAudio() {
    if (!this.data.isplay) {
      audio.play();
    } else {
      audio.pause();
    }
  },
  choiceMusic(e) {
    let name = e.currentTarget.dataset.name;

    let ado = this.data.audioList.find(v => name == v.name);

    audio.pause();
    // 默认选择列表第一项
    this.selMusic(ado);
    audio.play();


  }
})