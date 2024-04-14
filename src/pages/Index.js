import { useMemo, useState, useCallback, useContext, useEffect } from 'react';
import '../App.css';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { AccessContext, AccessProvider } from '../components/AccessProvider';

function Index() {
    const rootURL = 'http://ec2-18-226-180-32.us-east-2.compute.amazonaws.com'

    const [selectedFile, setSelectedFile] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");
    
    const [audioURL, setAudioURL] = useState("")
    const [styleMode, setStyleMode] = useState("0") // 0 is concise, 1 is elaborate

    const { databaseID, providerToken } = useContext(AccessContext)

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles);
        console.log(acceptedFiles);
    }, [])

    useEffect(() => {
        if (selectedFile.length > 0) {
            callUpload()
        }
    }, [selectedFile])

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
        }
    })

    const acceptedFileItems = acceptedFiles.map(file =>
        (
                <li key={file.path}>
                    {file.path}
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

    const callUpload = async () => {
        setUploadStatus("Uploading....");
        const formData = new FormData();
        selectedFile.map(file => formData.append("file", file));

        try {
            const response = await axios.post(`${rootURL}/api/v1/upload/`, formData);

            if (response.status >= 200 && response.status < 300) {
                console.log(response.data);
                setAudioURL(response.data.audio);
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

    const callPredict = async () => {

        console.log("AUDIO URL: ", audioURL);

        try {
            const response = await axios.get(`${rootURL}/api/v1/predict/${audioURL}/${databaseID}?provider_token=${providerToken}&style=${styleMode}`);

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

    const updateStyle = (e) => {
        e.preventDefault();
        setStyleMode(e.target.value);
    }


    return (
        <div className="App">
            <section className="container">
                <h2 className="noted-header">Noted.</h2>
                <div className='upload-submit'>
                    <div {...getRootProps({ className: 'dropzone', style})}>
                        <input {...getInputProps()} />
                        <span className="material-symbols-outlined">upload</span>
                        <div className='upload-text'>
                            <p>Upload here.</p>
                        </div>

                        {/* { acceptedFiles.length > 0 ? 
                            acceptedFileItems
                            :
                            <>
                                <span className="material-symbols-outlined">upload</span>
                                <div className='upload-text'>
                                    <p>Upload here.</p>
                                </div>
                            </>
                        } */}
                    </div>
                    <div className='upload-btn'>
                        <button 
                        onClick={callPredict} 
                        style={{
                            background: "#292929",
                            padding: "0",
                            border: 'none'
                        }}
                        disabled={audioURL === ""}>
                            <span 
                            className="material-symbols-outlined" 
                            style={{
                                color: "#F6BF33",
                                scale: "2"
                                }}
                                >send</span>
                        </button>
                        {/* <button onClick={callPredict} disabled={audioURL===""}>Submit to Gemini</button> : */}
                    </div>
                </div>
                <div style={{
                    display: "grid",
                    gridRow: "1 1",
                    gap: "0.5em",
                }}>
                    <button disabled={styleMode === "0"} onClick={updateStyle} value="0">Concise</button> 
                    <button disabled={styleMode === "1"} onClick={updateStyle} value="1">Elaborate</button> 
                </div>
                <p>{uploadStatus}</p>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul> 
                {/* <aside>
                    <h4>Rejected files</h4>
                    <ul>{fileRejectionItems}</ul>
                </aside> */}
            </section>
        </div>
    );
}

export default Index;