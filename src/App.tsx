import React, { Component } from 'react';
import './App.css';

type Props = {};
type State = {
  dataArray: Uint8Array;
};

class App extends Component<Props, State> {
  state: State = {
    dataArray: new Uint8Array()
  };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        let context = new AudioContext();
        let input = context.createMediaStreamSource(stream);
        let analyzer = context.createAnalyser();
        input.connect(analyzer);

        analyzer.fftSize = 4096;
        console.log("sampleRate: ", context.sampleRate);

        // E, F, F#, G, G#, A, A#, B, C, C#, D, D#  -- 2
        // E, F, F#, G, G#, A, A#, B, C, C#, D, D#  -- 3
        // E, F, F#, G, G#                          -- 4

        // A2 = 110Hz
        // A3 = 220Hz
        // A4 = 440Hz

        // (2^(1/12))^tone * 440 = freq
        // tone * log2(2^(1/12)) + log2 440 = log2 freq
        // tone = log2 (freq / 440) / log2 (2^(1/12))
        // tone = 12 * log2 (freq / 440)

        setInterval(
          () => {
            let dataArray = new Uint8Array(analyzer.frequencyBinCount);
            analyzer.getByteFrequencyData(dataArray);
            this.setState({ dataArray: dataArray });
          },
          100
        )
      });
  }

  render() {
    const { dataArray } = this.state;


    let maxFrequency = -1, maxFrequencyVolume = 0;
    for (let i = 0; i < dataArray.length; i++) {
      let frequency = 48000 * i / 4096;
      if (frequency < 82) {
        continue;
      }

      // 数字は適当
      if (dataArray[i] > 200 && dataArray[i] > maxFrequencyVolume) {
        maxFrequencyVolume = dataArray[i];
        maxFrequency = frequency;
      }
    }

    let toneName = "none";
    if (maxFrequency !== -1) {
      let tone = Math.round(12 * Math.log2(maxFrequency / 440));
      const toneNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
      let toneIndex = tone % 12;
      if (toneIndex < 0) {
        toneIndex += 12
      }
      toneName = toneNames[toneIndex];
    }

    let correct = false;
    if (toneName === "G") {
      correct = true;
    }

    return (
      <div className="App">
        <h2>Guitar Positions</h2>

        <div style={{ backgroundColor: correct ? "lightblue" : "lightpink", display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: 30 }}>G</div>
          <div style={{ width: 20 }}></div>
          <div style={{ fontSize: 30 }}>
            {toneName}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          frequency = {maxFrequency}
        </div>

        <h2>説明</h2>
        <ul>
          <li>画面上に音名が表示されます</li>
          <li>ギターでその音を鳴らします</li>
          <li>正しい音であれば次の音、間違っていればそこで終了となります</li>
        </ul>

      </div>
    );
  }
}

export default App;
