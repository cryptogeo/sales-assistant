declare module 'react-speech-recognition' {
  interface SpeechRecognition {
    startListening: (options?: { continuous?: boolean; language?: string }) => void;
    stopListening: () => void;
    getPermission: () => Promise<void>;
  }

  interface UseSpeechRecognitionResponse {
    transcript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
  }

  const SpeechRecognition: SpeechRecognition;
  export const useSpeechRecognition: () => UseSpeechRecognitionResponse;
  export default SpeechRecognition;
}