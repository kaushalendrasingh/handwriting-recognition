import { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import axios from 'axios';
import Head from 'next/head';

// Define the type for the API response from the Flask backend
interface PredictionResponse {
  digit: number;
  confidence: number;
  error?: string;
}

export default function Home() {
  // Type the canvas ref for react-canvas-draw
  const canvasRef = useRef<CanvasDraw | null>(null);
  // Type state variables
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle prediction from canvas drawing
  const handlePredict = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setConfidence(null);

    try {
      if (!canvasRef.current) {
        setError('Canvas not initialized');
        setIsLoading(false);
        return;
      }

      const canvas = canvasRef.current.canvas.drawing;
      const imageData = canvas.toDataURL('image/png');
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'drawing.png');

      const response = await axios.post<PredictionResponse>('http://localhost:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setPrediction(response.data.digit);
        setConfidence(response.data.confidence);
      }
      console.log('err:', response.data.error);

    } catch (err) {
      console.log('err:', err);
      setError('Failed to connect to the server. Ensure the Flask backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle prediction from uploaded image
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setConfidence(null);

    const file = e.target.files?.[0];
    if (!file) {
      setError('No file selected.');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post<PredictionResponse>('http://localhost:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setPrediction(response.data.digit);
        setConfidence(response.data.confidence);
      }
    } catch (err) {
      setError('Failed to process the uploaded image.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear the canvas
  const handleClear = (): void => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
    setPrediction(null);
    setConfidence(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Head>
        <title>Handwritten Digit Recognition</title>
        <meta name="description" content="AI-powered handwritten digit recognition" />
      </Head>
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full border-2 border-cyan-400 animate-pulse-glow">
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Digit Recognizer</h1>
        <p className="text-center text-gray-300 mb-4">Draw a digit or upload an image to predict!</p>

        <div className="flex justify-center mb-4">
          <CanvasDraw
            ref={canvasRef}
            canvasWidth={200}
            canvasHeight={200}
            brushColor="#ffffff"
            brushRadius={8}
            lazyRadius={0}
            backgroundColor="#000000"
            className="border-2 border-magenta-500 rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={handlePredict}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-semibold text-white ${
                isLoading ? 'bg-gray-600' : 'bg-cyan-500 hover:bg-cyan-600'
              } transition duration-300`}
            >
              {isLoading ? 'Predicting...' : 'Predict'}
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-magenta-500 hover:bg-magenta-600 text-white font-semibold transition duration-300"
            >
              Clear
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
          />
        </div>

        {prediction !== null && confidence !== null && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-2xl text-cyan-400 font-bold">
              Predicted Digit: {prediction}
            </p>
            <p className="text-gray-300">
              Confidence: {(confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
        {error && (
          <div className="mt-6 text-center text-red-400">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}