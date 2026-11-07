// Procedural High-Octane Cyber Sound & Music Engine (Web Audio API)
class CyberAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isBgmPlaying: boolean = false;
  private bgmInterval: NodeJS.Timeout | null = null;
  private step: number = 0;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.init();
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.playChime(660, "sine", 0.08, 0.06);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleBGM(): boolean {
    this.init();
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.isMuted = false;
      this.startBGM();
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public getAudioFrequencyData(): number {
    if (!this.analyser || !this.dataArray || !this.isBgmPlaying) return 0;
    this.analyser.getByteFrequencyData(this.dataArray);
    // Return average energy in low bass frequencies (bins 0-4)
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += this.dataArray[i];
    }
    return sum / (4 * 255); // Normalized 0.0 - 1.0
  }

  public startBGM() {
    if (this.isBgmPlaying) return;
    this.init();
    this.isBgmPlaying = true;
    this.step = 0;

    // 124 BPM Cyber Synth Groove
    const bpm = 124;
    const intervalMs = (60 / bpm / 4) * 1000; // 16th notes

    // Bassline notes (in Hz): D1 (36.7), F1 (43.6), G1 (49.0), A1 (55.0)
    const bassline = [
      73.4, 73.4, 0, 73.4,
      87.3, 0, 98.0, 0,
      73.4, 73.4, 110.0, 73.4,
      87.3, 98.0, 0, 65.4,
    ];

    this.bgmInterval = setInterval(() => {
      if (!this.ctx || this.isMuted) return;

      const current16th = this.step % 16;
      const now = this.ctx.currentTime;

      // 1. Kick on every quarter beat (0, 4, 8, 12)
      if (current16th % 4 === 0) {
        this.triggerKick(now);
      }

      // 2. Hi-hat on offbeat 16ths
      if (current16th % 2 === 1) {
        this.triggerHihat(now, current16th % 4 === 3 ? 0.015 : 0.008);
      }

      // 3. Bass synth
      const freq = bassline[current16th];
      if (freq > 0) {
        this.triggerBass(now, freq);
      }

      this.step++;
    }, intervalMs);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  private triggerKick(time: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.frequency.setValueAtTime(140, time);
      osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);

      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

      osc.connect(gain);
      if (this.analyser) {
        gain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start(time);
      osc.stop(time + 0.12);
    } catch {}
  }

  private triggerHihat(time: number, vol: number) {
    if (!this.ctx) return;
    try {
      // Noise burst for crisp hi-hat
      const bufferSize = this.ctx.sampleRate * 0.03;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 7500;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(vol, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(time);
      noise.stop(time + 0.03);
    } catch {}
  }

  private triggerBass(time: number, freq: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, time);
      filter.frequency.exponentialRampToValueAtTime(180, time + 0.1);

      gain.gain.setValueAtTime(0.045, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      if (this.analyser) {
        gain.connect(this.analyser);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start(time);
      osc.stop(time + 0.14);
    } catch {}
  }

  public playHover() {
    if (this.isMuted) return;
    this.init();
    this.playChime(480, "sine", 0.03, 0.02);
  }

  public playClick() {
    if (this.isMuted) return;
    this.init();
    this.playChime(880, "triangle", 0.05, 0.05);
  }

  public playExplode() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  public playSpatialTest() {
    this.playExplode();
  }

  private playChime(freq: number, type: OscillatorType, dur: number, vol: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch {}
  }
}

export const cyberAudio = new CyberAudioEngine();
export const sound = cyberAudio;
