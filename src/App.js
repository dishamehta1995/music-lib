import './App.css';
import { MusicList } from './components/MusicList';
import { NavBar } from './components/NavBar';
import { GlobalProvider } from './contexts/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <div className='container'>
        <NavBar/>
        <MusicList/>
      </div>
    </GlobalProvider>
  );
}

export default App;
