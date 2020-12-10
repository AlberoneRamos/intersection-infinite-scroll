import './App.css';
import { useRef, useState } from 'react';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import { HashLoader } from 'react-spinners';
import useFetch from './hooks/useFetch';

function App() {
  const [page, setPage] = useState(1);
  const { data: images, loading } = useFetch(`https://picsum.photos/v2/list?page=${page}&limit=10`);
  const loader = useRef(null);
  
  useIntersectionObserver(
    loader,
    () => (!loading) && setPage((page) => page + 1)
  );
  

  return (
    <div>
      <div className="content">
        <h1 className="title">Infinite scroll with intersection observer!</h1>
        <div className="flex">
          {images.length > 0 && (
            images.map((image) => (
              <img 
                src={image.download_url} 
                alt={image.author} 
                className="image"
                key={image.download_url}
              />
            )
          ))}
        </div>
        <div className="flex">{loading && <HashLoader />}</div>
      </div>
      <div style={{ height: "20px" }} className="flex" ref={loader} />
    </div>
  )
}

export default App;
