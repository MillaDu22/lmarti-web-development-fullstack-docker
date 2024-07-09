import './App.css';
import Header from './components/Header/index.jsx';
import Footer from './components/Footer/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import Banner from './components/Banner/index.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Banner />
      <Footer />
    </div>
  );
}

export default App;
