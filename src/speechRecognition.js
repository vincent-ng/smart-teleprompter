export function setupSpeechRecognition() {
  let recognition = null;
  let currentLanguage = 'zh-CN'; // Set Chinese as default language

  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentLanguage;
  } catch (e) {
    console.error('Speech recognition not supported:', e);
    return { startRecognition: () => {}, stopRecognition: () => {} };
  }

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0].transcript)
      .join('');
    console.log(transcript)

    window.dispatchEvent(new CustomEvent('speech-progress', {
      detail: { transcript }
    }));
  };

  return {
    startRecognition: () => {
      try {
        recognition.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    },
    stopRecognition: () => {
      try {
        recognition.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    },
    setLanguage: (lang) => {
      currentLanguage = lang;
      recognition.lang = lang;
    }
  };
}