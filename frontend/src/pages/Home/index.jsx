import './home.css';
import Navbar from '../../components/Navbar/index.jsx';
import Banner from '../../components/Banner/index.jsx';
import Carousel from '../../components/Carousel/index.jsx';
import Gallery from '../../components/Gallery/index.jsx';
import Features from '../../components/Features/index.jsx';

function Home() {
    return (
        <div className="home">
            <Navbar />
            <Banner />
            <Carousel />
            <Gallery />
            <Features />
        </div>
    );
}

export default Home;
