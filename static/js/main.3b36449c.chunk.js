(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),i=n.n(o),l=(n(14),n(3)),c=n(4),u=n(6),s=n(5),d=n(7),m=(n(15),function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={dataArray:new Uint8Array},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(t){var n=new AudioContext,a=n.createMediaStreamSource(t),r=n.createAnalyser();a.connect(r),r.fftSize=4096,console.log("sampleRate: ",n.sampleRate),setInterval(function(){var t=new Uint8Array(r.frequencyBinCount);r.getByteFrequencyData(t),e.setState({dataArray:t})},100)})}},{key:"render",value:function(){for(var e=this.state.dataArray,t=-1,n=0,a=0;a<e.length;a++){var o=48e3*a/4096;o<82||e[a]>200&&e[a]>n&&(n=e[a],t=o)}var i="none";if(-1!==t){var l=Math.round(12*Math.log2(t/440))%12;l<0&&(l+=12),i=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"][l]}var c=!1;return"G"===i&&(c=!0),r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Guitar Positions"),r.a.createElement("div",{style:{backgroundColor:c?"lightblue":"lightpink",display:"flex",justifyContent:"center"}},r.a.createElement("div",{style:{fontSize:30}},"G"),r.a.createElement("div",{style:{width:20}}),r.a.createElement("div",{style:{fontSize:30}},i)),r.a.createElement("div",{style:{marginTop:20}},"frequency = ",t),r.a.createElement("h2",null,"\u8aac\u660e"),r.a.createElement("ul",null,r.a.createElement("li",null,"\u753b\u9762\u4e0a\u306b\u97f3\u540d\u304c\u8868\u793a\u3055\u308c\u307e\u3059"),r.a.createElement("li",null,"\u30ae\u30bf\u30fc\u3067\u305d\u306e\u97f3\u3092\u9cf4\u3089\u3057\u307e\u3059"),r.a.createElement("li",null,"\u6b63\u3057\u3044\u97f3\u3067\u3042\u308c\u3070\u6b21\u306e\u97f3\u3001\u9593\u9055\u3063\u3066\u3044\u308c\u3070\u305d\u3053\u3067\u7d42\u4e86\u3068\u306a\u308a\u307e\u3059")))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.3b36449c.chunk.js.map