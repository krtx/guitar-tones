import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngry, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';
import './libs/AnalyserNodeExt';
import './App.css';

// E2(-29) - E4(-5)
function randomPitch() {
  return Math.floor(Math.random() * 25) - 29;
}

const noteNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

function pitchString(pitch: number) {
  let noteIndex = ((pitch % 12) + 12) % 12;
  let octave = Math.ceil(pitch / 12) + 4;
  return `${noteNames[noteIndex]}${octave}`;
}

type Props = {};
type State = {
  lastCorrectTime?: Date;
  targetPitch?: number;
  currentPitch?: number;
  showClear: boolean;
  dataArray: Uint8Array;
};

const NeutralSign = () => (
  <div style={{ color: "slateblue" }}>
    Listening
  </div>
)

const GoodSign = () => (
  <div style={{ color: "limegreen" }}>
    Good <FontAwesomeIcon icon={faThumbsUp} />
  </div>
);

const BadSign = () => (
  <div style={{ color: "deeppink" }}>
    NO <FontAwesomeIcon icon={faAngry} />
  </div>
);

class App extends Component<Props, State> {
  state: State = {
    showClear: false,
    dataArray: new Uint8Array()
  };

  componentDidMount() {
    this.setState({ targetPitch: randomPitch() });

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        let context = new AudioContext();

        // create analyzer node
        let analyser = context.createAnalyser();
        analyser.fftSize = 4096;
        //analyser.smoothingTimeConstant = 0.9;

        // connect mic input to analyzer node
        let input = context.createMediaStreamSource(stream);
        input.connect(analyser);

        setInterval(
          () => {
            let dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);
            this.setState({ dataArray: dataArray });

            let pitch = analyser.calculatePitch(context.sampleRate);
            this.setState({ currentPitch: pitch });
            if (pitch === undefined) {
              return;
            }

            if (pitch !== this.state.targetPitch) {
              this.setState({ lastCorrectTime: undefined });
              return;
            }

            const currentTime = new Date();
            if (this.state.lastCorrectTime === undefined) {
              this.setState({ lastCorrectTime: currentTime });
              return;
            }

            if (currentTime.getTime() - this.state.lastCorrectTime.getTime() > 300) {
              // next game
              this.setState({
                targetPitch: randomPitch(),
                lastCorrectTime: undefined,
                showClear: true
              });

              // turn off clear display
              setTimeout(() => {
                this.setState({ showClear: false });
              }, 1000);
            }
          },
          200
        )
      });
  }

  render() {
    let { currentPitch, targetPitch, dataArray } = this.state;

    /*
    let line = [];
    for (let i = 0; i < dataArray.length - 1; i++) {
      line.push(
        <line key={i}
          x1={i}
          y1={dataArray[i]}
          x2={i+1}
          y2={dataArray[i + 1]}
          stroke={dataArray[i] > 150 && dataArray[i + 1] > 150 ? "red" : "black"} strokeWidth={1}
        />
        );
    }
    */

    return (
      <div className="App">
        <h2><FontAwesomeIcon icon={faGuitar} /> Guitar Positions <FontAwesomeIcon icon={faGuitar} /></h2>

        <div style={{ height: 100 }}></div>

        {/* <svg width={800} height={400}>{line}</svg> */}

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ fontSize: 40 }}>
            {targetPitch && pitchString(targetPitch)}
          </div>
        </div>

        <div style={{ height: 50 }}></div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 30 }}>
          <div style={{ fontSize: 20, color: "gray" }}>
            {this.state.showClear && "clear"}
          </div>
        </div>

        <div style={{ height: 50 }}></div>

        <div style={{ display: "flex", justifyContent: "center", fontSize: 30, height: 30 }}>
          {currentPitch === undefined ? <NeutralSign /> :
            currentPitch === targetPitch ? <GoodSign /> :
              <BadSign />}
        </div>

        <div style={{ display: "flex", justifyContent: "center", height: 20 }}>
          <div style={{ marginTop: 20 }}>
            current tone: {(currentPitch && pitchString(currentPitch)) || "none"}
          </div>
        </div>

        

        <h2>説明</h2>
        <ul>
          <li>画面上に音名が表示されます</li>
          <li>その音を鳴らします</li>
          <li>正しい音であれば次の音に進みます</li>
        </ul>

      </div>
    );
  }
}

export default App;
