'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

const SalesAssistant = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setCopied] = useClipboard(response, {
    successDuration: 1000,
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!mounted) return null;

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser does not support speech recognition.</div>;
  }

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStop = async () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/sales-assistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: transcript }),
        });
        
        const data = await response.json();
        setResponse(data.response);
      } catch (err) {
        console.error('Error:', err);
        setResponse("Sorry, there was an error processing your request.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sales Assistant</h1>
      
      <div className="mb-6">
        <button
          onClick={handleStart}
          className={`mr-4 px-4 py-2 rounded ${
            listening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {listening ? 'Listening...' : 'Start Recording'}
        </button>
        
        <button
          onClick={handleStop}
          className="px-4 py-2 rounded bg-gray-500 text-white"
        >
          Stop Recording
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Input:</h2>
        <div className="p-4 bg-gray-100 rounded min-h-[100px]">
          {transcript}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">AI Response:</h2>
        <div className="p-4 bg-gray-100 rounded min-h-[100px]">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            response
          )}
        </div>
        {response && (
          <button
            onClick={setCopied}
            className="mt-2 px-4 py-2 rounded bg-green-500 text-white"
          >
            {isCopied ? 'Copied!' : 'Copy Response'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SalesAssistant;