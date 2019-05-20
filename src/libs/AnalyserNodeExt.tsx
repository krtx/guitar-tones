/**
 * Calculate tone index. A4 = 440Hz = tone index 0
 * @param sampleRate {number} sample rate
 * @return {number} tone index if found
 */
export default AnalyserNode.prototype.calculatePitch = function(this: AnalyserNode, sampleRate: number): number | undefined {
  let dataArray = new Uint8Array(this.frequencyBinCount);
  this.getByteFrequencyData(dataArray);

  let maxFrequency, maxFrequencyVolume = 0;
  for (let i = 0; i < dataArray.length; i++) {
    // let frequency = sampleRate * i / this.fftSize;
    // if (frequency < 60) {
    //   // ignore low frequencies
    //   continue;
    // }

    // threshould value is not well considered
    if (dataArray[i] > 150 && dataArray[i] > maxFrequencyVolume) {
      // use the first value exceeds the threshould

      // let average = 0, count = 0;

      // let as = [];

      // for (let j = i; j < dataArray.length; j++) {
      //   if (dataArray[j] < 150) {
      //     break;
      //   }

      //   average += j;
      //   count += 1;

      //   as.push(j);
      // }

      // average /= count;

      let f = sampleRate * (i + 2) / this.fftSize;
      let p = Math.round(12 * Math.log2(f / 440));

      console.log(f, p);

      return p;
    }
  }
}