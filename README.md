Handwritten Digit Recognition
A web-based AI project that recognizes handwritten digits (0-9) drawn on a canvas or uploaded as images, using a TensorFlow CNN model trained on the MNIST dataset. The frontend is built with Next.js (TypeScript) and Tailwind CSS for a modern, vibrant UI.
Features

Draw digits on an interactive canvas.
Upload handwritten digit images (28x28 grayscale recommended).
Predict digits with a trained CNN model served via Flask.
Attractive UI with neon accents and animations.
Type-safe frontend with TypeScript.
Deployable frontend on Vercel.

Installation

Clone the repository:git clone https://github.com/your-username/handwriting-recognition.git
cd handwriting-recognition


Set Up Python with pyenv:
Install pyenv (macOS):brew install pyenv
echo 'export PATH="$HOME/.pyenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
source ~/.zshrc


If Anaconda is installed, disable its base environment:conda config --set auto_activate_base false


Install Python 3.9.18:pyenv install 3.9.18
pyenv local 3.9.18




Backend Setup:
Create and activate a virtual environment:python -m venv venv
source venv/bin/activate


Install dependencies (use tensorflow-macos for M1/M2 Macs, tensorflow for Intel):pip install tensorflow-macos flask flask-cors numpy pillow


Train the model:python train_model.py


Run the Flask server:python app.py




Frontend Setup:
Navigate to the frontend directory:cd frontend


Install dependencies:npm install
npm install --save-dev typescript @types/react @types/node @types/react-canvas-draw


Run the development server:npm run dev





Usage

Open http://localhost:3000 in your browser.
Draw a digit (0-9) on the canvas or upload a 28x28 grayscale image.
Click "Predict" to see the model's prediction and confidence score.
Click "Clear" to reset the canvas.

Deployment

Frontend: Deploy the Next.js app to Vercel:
Install the Vercel CLI: npm install -g vercel.
From the frontend directory, run: vercel.
Follow the prompts to deploy.


Backend: For a fully online app, deploy app.py on a platform like Heroku or Render (not covered here). Update the API URL in pages/index.tsx to point to your deployed backend.
Local Testing: Run the Flask backend locally and access the frontend at http://localhost:3000.

License
MIT License