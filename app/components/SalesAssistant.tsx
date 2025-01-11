'use client';

import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';

const SalesAssistant = () => {
  const [mounted, setMounted] = useState(false);
  const [textInput, setTextInput] = useState('');  // Add this line

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
    SpeechRecognition.startListening({ 
      continuous: true,
      language: 'en-US',
      interimResults: true
    });
  };

  const handleStop = async () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      await processInput(transcript);
    }
  };

  const handleTextSubmit = async () => {  // Add this function
    if (textInput.trim()) {
      await processInput(textInput);
      setTextInput('');  // Clear the input after submission
    }
  };

  const processInput = async (input: string) => {  // Add this function
    setIsLoading(true);
    try {
      const response = await fetch('/api/sales-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      
      const data = await response.json();
      setResponse(data.response);
    } catch (err) {
      console.error('Error:', err);
      setResponse("Sorry, there was an error processing your request.");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sales Assistant</h1>
      
      {/* Voice Input Section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Voice Input</h2>
        <div className="mb-4">
          <button
            onClick={handleStart}
            className={`mr-4 px-4 py-2 rounded ${
              listening ? 'bg-purple-600' : 'bg-green-600'
            } text-white hover:opacity-90`}
          >
            {listening ? 'Listening...' : 'Start Recording'}
          </button>
          
          <button
            onClick={handleStop}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:opacity-90"
          >
            Stop Recording
          </button>
        </div>
        <div className="p-4 bg-gray-100 rounded min-h-[100px]">
          {transcript}
        </div>
      </div>

      {/* Text Input Section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Text Input</h2>
        <div className="flex gap-2">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="flex-1 p-2 border rounded min-h-[100px]"
            placeholder="Type your sales objection here..."
          />
          <button
            onClick={handleTextSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:opacity-90 h-fit"
          >
            Submit
          </button>
        </div>
      </div>

      {/* AI Response Section */}
      <div className="mb-6 p-4 bg-white rounded shadow">
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
            className="mt-2 px-4 py-2 rounded bg-teal-600 text-white hover:opacity-90"
          >
            {isCopied ? 'Copied!' : 'Copy Response'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SalesAssistant;