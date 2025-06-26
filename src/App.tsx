// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Posts from './pages/Posts';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Blog index (all posts) */}
        <Route path="/blog" element={<Blog />} />

        {/* Individual post view */}
        <Route path="/posts/:id" element={<Posts />} />

        {/* Static pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Fallback 404 (optional) */}
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;