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
    let circles = [];
    let maxFrequency = 0, maxFrequencyVolume = 0;
    for (let i = 0; i < this.state.dataArray.length; i++) {
      circles.push(<circle key={i} cx={i / 2} cy={this.state.dataArray[i] / 4} r={0.5}></circle>);

      let frequency = 48000 * i / 4096;
      if (frequency < 82) {
        continue;
      }

      if (this.state.dataArray[i] > maxFrequencyVolume) {
        maxFrequencyVolume = this.state.dataArray[i];
        maxFrequency = frequency;
      }
    }

    return (
      <div className="App">
        <h2>Guitar Positions</h2>
        <svg viewBox="0 0 200 100">
          {circles}
        </svg>
        {maxFrequency} / {this.state.dataArray.length} {maxFrequencyVolume}
      </div>
    );
  }
}

export default App;
