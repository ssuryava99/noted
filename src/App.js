import { useCallback } from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';

function App() {

  const onDrop = useCallback(acceptedFiles => {
    // do something
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="App">
      <h2>Noted.</h2>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    </div>
  );
}

export default App;
