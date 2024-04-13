import { useMemo } from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';

function App() {

  // const onDrop = useCallback(acceptedFiles => {
  //   // do something
  // }, [])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
      maxFiles: 1,
      accept: {
        'video/mp4': ['.mp4'],
        'audio/mpeg': ['.mp3']
      }
    })

  const acceptedFileItems = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

  const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
   return (
     <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => <li key={e.code}>{e.message}</li>)}
         </ul>

     </li>
   ) 
  });

  const style = useMemo(() => ({
    color: "blue"
    
  }), [])

  return (
    <div className="App">
      <h2>Noted.</h2>
      <section className="container">
      <div {...getRootProps({ className: 'dropzone', style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only drop 1 file)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
      </section>
    </div>
  );
}

export default App;
