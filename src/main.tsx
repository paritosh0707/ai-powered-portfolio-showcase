import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </HelmetProvider>
);
