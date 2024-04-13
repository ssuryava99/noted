import { useMemo, useState, useCallback } from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function App() {

    const rootURL = "https://102a-35-2-16-244.ngrok-free.app"

    const [selectedFile, setSelectedFile] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");

    const [audioURL, setAudioURL] = useState("")

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles);
        console.log(acceptedFiles);
    }, [])

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        maxFiles: 2,
        accept: {
            'video/mp4': ['.mp4'],
            'audio/mpeg': ['.mp3']
        },
        noClick: selectedFile.length > 0
    })

    const acceptedFileItems = acceptedFiles.map(file =>
        (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        )
    );

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


    const onUpload = async () => {
        setUploadStatus("Uploading....");
        const formData = new FormData();
        selectedFile.map(file => formData.append("file", file));

        try {
            const response = await axios.post(`${rootURL}/api/v1/upload/`, formData);

            if (response.status >= 200 && response.status < 300) {
                // console.log("RESPONSE 0: ", response.data);
                // console.log("RESPONSE 1: ", response.data["audio"]);
                // console.log("RESPONSE 2: ", response.data.audio);
                setAudioURL(response.data.audio);
                // console.log("RESPONSE AUDIO: ", audioURL);
                setUploadStatus("Upload successful");
                setSelectedFile([]) // reset the selectedFiles
            } else {
                console.error("Failed to upload: ", response.statusText);
                setUploadStatus("Upload failed...");
            }
        } catch (error) {
            console.error("Upload error: ", error);
            setUploadStatus("Upload failed...");
        }
    };

    const testAPI = async () => {

        console.log("AUDIO URL: ", audioURL);

        try {
            const response = await axios.get(`${rootURL}/api/v1/download/${audioURL}`);

            if (response.status >= 200 && response.status < 300) {
                console.log("RESPONSE DOWNLOAD: ", response.data);
            } else {
                console.error("Test api download: ", response.statusText);
            }
        } catch (error) {
            console.error("Test api download error: ", error);
        }
    };

    const style = useMemo(() => ({
        color: "white",
        textAlign: "left",
        border: "solid 2px #F6BF33",
        borderRadius: "20px",
        margin: "1em",
        display: "flex",
        flexDirection: "col",
        justifyContent: "space-around",
        alignItems: "center",
        fontSize: "24px",
        width: "280px"
    }), [])

    return (
        <div className="App">
            <h2 className="noted-header">Noted.</h2>
            <section className="container">
                <div {...getRootProps({ className: 'dropzone', style})}>
                    <input {...getInputProps()} />
                    <span className="material-symbols-outlined">upload</span>
                    <div className='upload-text'>
                        <p>Upload here.</p>
                    </div>
                </div>
                <div className='upload-btn'>
                    {/* {
        selectedFile.length > 0 ?
        <button onClick={onUpload}>Upload to Jun Kit's Server</button> :
        <button onClick={onUpload} disabled>Upload to Jun Kit's Server</button>
      } */}
                    <button onClick={onUpload} disabled={selectedFile.length === 0}>
                        <span class="material-symbols-outlined">send</span>
                    </button>
                    {
                        audioURL === "" ?
                            <button onClick={testAPI} disabled>GET AUDIO</button> :
                            <button onClick={testAPI}>GET AUDIO</button>
                    }

                    <p>{uploadStatus}</p>
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