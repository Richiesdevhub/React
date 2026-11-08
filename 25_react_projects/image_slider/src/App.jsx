import './App.css';
import Image_slider from './components/image_slider';

function App(){
  return(
  <div className='App'>
    <Image_slider url={'https://picsum.photos/v2/list'} page={'1'} limit={'10'} />
  </div>
)}

export default App

//https://picsum.photos/v2/list?page=1&limit=5