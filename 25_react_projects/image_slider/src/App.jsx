import './App.css';
import image_slider from './components/image_slider';

function App(){
  return(
  <div className='App'>
    <image_slider url={'https://picsum.photos/v2/list'} limit={'10'}/>
  </div>
)}

export default App