<template>
  <div class="main" v-if="flag">
    <div class="bg" :style="'background-image:url('+song.pic+')'"></div>
    <button class="toolbar">→</button>

    <div class="controller-box">
      <a-player
        :music="song"
        :list="List"
        showLrc
        listMaxHeight="200px"
        @play="play"
        @pause="pause"
        @change="change(song.index)"
        v-if=flag
      />
    </div>
    <div class="disc">
      <div class="song-img" :style="'background-image:url('+song.pic+')'" ref="rotate"></div>
    </div>

    <div class="toolbox">
      <div class="last" @click="last"></div>
      <div class="like" @click="like">
        <li :class="[List[songIndex].islike ? 'heart':'normal']">&#10084;</li>
      </div>
      <div class="next" @click="next"></div>
    </div>
  </div>
</template>

<script>
import VueAplayer from "vue-aplayer";
import axios from "axios";
export default {
  name: "Song",
  components: {
    "a-player": VueAplayer
  },
  data() {
    return {
      flag: false,
      islike: false,
      songIndex: 0,
      isPlay: false,
      song: {},
      List: []
    };
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      const getMusicList = url => axios.get(url);

      //写入获取音乐的url
      let url = "http://localhost:8080/getMusicList";
      let data = await getMusicList(url);
      console.log(data.data);
      if (data.data) {
          this.List = data.data;

        }


      this.song = this.List[this.songIndex];
      this.flag = true;
    },
    next() {
      if (this.songIndex === this.List.length - 1) this.songIndex = -1;
      this.songIndex++;
      this.song = this.List[this.songIndex];
      this.$nextTick(() => {
        this.playIt();
      });
    },
    last() {
      if (this.songIndex === 0) this.songIndex = this.List.length;
      this.songIndex--;
      this.song = this.List[this.songIndex];
      this.$nextTick(() => {
        this.playIt();
      });
    },
    like() {
      this.List[this.songIndex].islike = !this.List[this.songIndex].islike;
    },
    play() {
      this.$refs.rotate.style.animationPlayState = "running";
      this.isPlaying = true;
    },

    //上下切换歌曲时触发磁盘转动
    playIt() {
      var v = document.getElementsByTagName("audio")[0];
      this.$refs.rotate.style.animationPlayState = "running";
      v.play();
      this.isPlaying = true;
    },

    pause() {
      this.$refs.rotate.style.animationPlayState = "paused";
      this.isPlaying = false;
    },
    change(Index) {
      this.songIndex = Index;
    }
  }
};
</script>
 
<style scoped>
button {
  outline: none;
}

.main {
  position: fixed;
  top: 50%;
  left: 50%;
  font-family: sans-serif;
  transform: translate(-50%, -50%);
  min-width: 100%;
  height: 100%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
}

.toolbar {
  position: absolute;
  top: 15px;
  left: 10px;
  font-size: 18px;
  background-color: transparent;
  border: none;
  color: #fff;
  outline: none;
}

.song-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(0deg);
  width: 200px;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid #000;
  border-radius: 200px;
  animation: animations1 10s linear infinite forwards;
  animation-play-state: paused;
}

@keyframes animations1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.disc {
  position: fixed;
  top: 45%;
  margin-left: 20%;
  width: 300px;
  height: 300px;
  border-radius: 300px;
  transform: rotate(45deg);
  background-image: radial-gradient(5em 30em ellipse, #fff, #000);
  border: 2px solid #131313;
  box-shadow: 0 0 0 10px #343935;
  opacity: 0.7;
}

.bg {
  position: absolute;
  transform: translate(0%, 20%);
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
  z-index: -1;
}

.controller-box {
  margin-top: 50px;
  vertical-align: middle;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.toolbox {
  position: fixed;
  top: 85%;
  vertical-align: middle;
  width: 100%;
  border-radius: 10px;
}

.like {
  margin: 0px 50px;
  top: 0px;
  position: relative;
  display: inline-block;
  height: 72px;
  width: 72px;
  border: 2px solid #fff;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  background-color: transparent;
}

.heart {
  display: inline-block;
  content: "";
  color: rgb(245, 9, 9);
  font-size: 55px;
}

.normal {
  display: inline-block;
  content: "";
  font-size: 55px;
}

.red-like {
  border-color: rgb(238, 8, 8) !important;
}

.red-like:after,
.red-like:before {
  border-left-color: rgb(238, 8, 8) !important;
}

.last {
  position: relative;
  top: 15px;
  display: inline-block;
  height: 72px;
  width: 72px;
  border: 2px solid #fff;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
}


.last:before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  border: 25px transparent solid;
  border-left-width: 0;
  border-right-color: #fff;
  position: absolute;
  top: 10px;
  left: 26px;
}

.last:after {
  content: "";
  height: 40px;
  width: 6px;
  display: block;
  background: #fff;
  position: absolute;
  top: 14px;
  left: 20px;
}

.next {
  position: relative;
  display: inline-block;
  top: 15px;
  height: 72px;
  width: 72px;
  border: 2px solid #fff;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
}


.next:before {
  content: "";
  height: 0;
  width: 0;
  display: block;
  border: 25px transparent solid;
  border-right-width: 0;
  border-left-color: #fff;
  position: absolute;
  top: 10px;
  left: 26px;
}

.next:after {
  content: "";
  height: 40px;
  width: 6px;
  display: block;
  background: #fff;
  position: absolute;
  top: 16px;
  right: 14px;
}
</style>
