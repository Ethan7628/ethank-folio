import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Hide loading screen once React mounts
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 300);
  }
};

// Render app
const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hide loading screen after initial render
requestAnimationFrame(() => {
  requestAnimationFrame(hideLoadingScreen);
});
