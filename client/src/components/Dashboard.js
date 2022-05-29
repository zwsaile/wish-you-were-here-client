import React, { useState, useRef, useEffect } from 'react';
import { useSocket } from '../context/SocketProvider';
import '../styles/Dashboard.css';
import UserList from './UserList';

function Dashboard(props) {
    // Socket
    const {
        name,
        id,
        pronouns,
        email
    }= JSON.parse(props.data)

    const socket = useSocket()
    const [connectionStatus, setConnectionStatus] = useState(false)
    const [connectedUsers, setConnectedUsers] = useState(false)

    // Video/Images
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1080 }}) // width and height are scalable TO these params
<<<<<<< HEAD
        .then(videoFeed => {
            let video = videoRef.current;
            video.srcObject = videoFeed;
=======
        .then(videoStream => {
            let video = videoRef.current;
            video.srcObject = videoStream;
>>>>>>> main
            video.play();
        })
        .catch(error => console.log(error));
    }
    const takePhoto = () => {
        const width = 414;
        const height = width / (16/9); // get a 16 by 9 ratio

        let video = videoRef.current;
        let photo = photoRef.current;
        photo.width = width;
        photo.height = height;

        let context = photo.getContext('2d');
        context.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    }

    const clearPhoto = () => {
        let photo = photoRef.current;
        let context = photo.getContext('2d');

        context.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);

    }
    useEffect(() => {getVideo()}, [videoRef]);

    useEffect(() => {getVideo});

    const readURL = () => {
        let input = document.getElementById("icon-button-file")
        if (input.files[0]) {
            let reader = new FileReader()
            reader.onload = (event) => {
                document.querySelector(".preview").src = event.target.result
            }
            reader.readAsDataURL(input.files[0])
        }
    }
    
    useEffect(() => {
        socket && socket.on("user-connected", (data) => {
            if (id === data.id) {
            console.log("Self Connection Verified")
            setConnectionStatus(socket.connected)
            } else {
            console.log("Another User Connected", data.name)
            }
        })

        socket && socket.on("recieve-users-list", (data) => {
            setConnectedUsers(data)
        })

        socket && socket.on("user-disconnected", (data) => {
            console.log(`${data.name} disconnected`)
        })

        return () => {
            setConnectionStatus(false)
        }
    }, [socket])

    console.log("connected users", connectedUsers)
    return (
<<<<<<< HEAD
        <section className='image-capture-container'>
            {/* <h1 className='large'>{`Hello ${userId}!`}</h1> */}
            <section className='live-photo'>
                <div className='camera-display'>
                    <video ref={videoRef}></video>
                    <button className="cheese btn" onClick={takePhoto}></button>
                </div>
                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                    <canvas ref={photoRef}></canvas>
                    <button onClick={clearPhoto}>Clear</button>
                </div>
            </section>
            <section className='upload-photo'>
                <input 
=======
        <>
            {/* <h1 className='large'>{`Hello ${userId}!`}</h1> */}
            <section className='live-photo app'>
                <div className='camera'>
                    <video ref={videoRef}></video>
                    <button>CHEESE!</button>
                </div>
                <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                    <canvas ref={photoRef}></canvas>
                    <button>CLOSE!</button>
                </div>
            </section>
            <section className='upload-photo'>
                <section>
                    <h1 className='large'>{`Hello ${name}!`}</h1>
                    <input 
>>>>>>> main
                    // accept="image/png, image/jpeg" - use to limit to .png and .jpeg
                    accept="image/*" 
                    id="icon-button-file" 
                    type="file" 
                    capture="environment" 
<<<<<<< HEAD
                    onChange={(e) => readURL(e)}
                />
                <img className="preview" src=""/>
            </section>
        </section>
=======
                    onChange={() => readURL()}
                    />
                <img className="preview" src=""/>
                </section>
            </section>
            <section>
                <form onClick={props.logOut}>
                    <button type='submit'>Log Out</button>
                </form>
                <section className='usersListContainer'>
                { !!connectedUsers && <UserList connectedUsers={connectedUsers} />}
                </section>
        </section>
     </>
>>>>>>> main
    )
}

export default Dashboard;