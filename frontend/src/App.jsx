import Navbar from './components/Layout/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import ProductGrid from './components/Products/ProductGrid';
import Footer from './components/Layout/Footer';
import ChatWidget from './components/ChatAgent/ChatWidget';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ProductGrid />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
