(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(2),i=a.n(o),c=(a(14),a(3)),s=a(4),l=a(6),u=a(5),d=a(7),h=(a(15),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={dataArray:new Uint8Array},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(t){var a=new AudioContext,n=a.createMediaStreamSource(t),r=a.createAnalyser();n.connect(r),r.fftSize=4096,console.log("sampleRate: ",a.sampleRate),setInterval(function(){var t=new Uint8Array(r.frequencyBinCount);r.getByteFrequencyData(t),e.setState({dataArray:t})},100)})}},{key:"render",value:function(){for(var e=[],t=0,a=0,n=0;n<this.state.dataArray.length;n++){e.push(r.a.createElement("circle",{key:n,cx:n/2,cy:this.state.dataArray[n]/4,r:.5}));var o=48e3*n/4096;o<82||this.state.dataArray[n]>a&&(a=this.state.dataArray[n],t=o)}return r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Guitar Positions"),r.a.createElement("svg",{viewBox:"0 0 200 100"},e),t," / ",this.state.dataArray.length," ",a)}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,a){e.exports=a(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.36ab5bf3.chunk.js.map