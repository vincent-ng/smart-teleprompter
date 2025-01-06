export function setupAudioVisualizer() {
  const volumeIndicator = document.createElement('div');
  volumeIndicator.className = 'volume-indicator';
  document.querySelector('.controls').appendChild(volumeIndicator);

  let audioContext;
  let analyser;
  let microphone;

  async function initializeAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      analyser.fftSize = 256;
      updateVolume();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }

  function updateVolume() {
    if (!analyser) return;
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const volume = Math.min(100, Math.round((average / 128) * 100));
    
    volumeIndicator.style.width = `${volume}%`;
    volumeIndicator.style.backgroundColor = `hsl(${120 * (volume / 100)}, 70%, 50%)`;
    
    requestAnimationFrame(updateVolume);
  }

  return {
    start: initializeAudio,
    stop: () => {
      if (microphone) {
        microphone.disconnect();
        audioContext?.close();
      }
    }
  };
}