import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import 'swiper/swiper.min.css'
import './assets/boxicons-2.1.0/boxicons-2.1.0/css/boxicons.min.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Routes from './config/Routes'

function App() {
  return (
    <BrowserRouter>
      <Route render={props => (
        <>
          <Header {...props}/>
          <Routes />
          <Footer />
        </>
      )} />
    </BrowserRouter>
  );
}

export default App;
