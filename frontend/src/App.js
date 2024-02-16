import logo from './logo.svg';
import './App.css';
import Subscription from './pages/Subscription';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Otp from './pages/Otp';
import Terms from './pages/Terms';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
         <Route path='/' element={<Subscription/>}/>
         <Route path='/otp-validation' element={<Otp/>}/>
         <Route path='/terms&conditions' element={<Terms/>}/>
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
