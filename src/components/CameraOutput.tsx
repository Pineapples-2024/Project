import "@/styles/cameraoutput.css"
import ImageButton from "./ImageButton";
import { useEffect, useRef, useState } from "react";

const mediaDevices = navigator.mediaDevices;

interface RawCameraProps {
    paused: boolean
}
function RawCamera({ paused }: RawCameraProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(function() {
        if (!videoRef.current) return;
        if (!canvasRef.current) return;

        let video = videoRef.current!;
        let canvas = canvasRef.current!;
        let ctx = canvas.getContext("2d");

        mediaDevices.getUserMedia({
            "video": true
        }).then((stream) => {
            video.srcObject = stream;
            video.muted = true;
            
            video.addEventListener("loadedmetadata", function() {
                if (paused) {
                    video.pause();

                    ctx?.drawImage(video, video.getBoundingClientRect().width, video.getBoundingClientRect().height)
                } else {
                    video.play();
                }
            });
        }).catch(function(error) {
            alert("Could not access camera!");
            console.error(error);
        });
    });

    return <>
        <video ref={videoRef}></video>
        <canvas ref={canvasRef}></canvas>
    </>
}

interface CameraOutputProps {
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    active: boolean;
}
function CameraOutput({ setActive, active }: CameraOutputProps) {
    const [ paused, setPaused ] = useState(false);

    const VIDEO = <RawCamera paused={paused} />;

    return <div className={"camera-output-window " + (active ? "enabled" : "")}>
        <div className="camera-ui-overlays">
            <div className="ui-top">
                <ImageButton
                    width={55}
                    icon="/images/camera-return.svg"
                    onclick={() => {
                        setActive(false);
                    }}
                />

                {/* <button>
                    <img src="/images/camera-flash.svg" alt="Camera flash toggle" />
                </button> */}
            </div>
            <div className="camera-output">
                {active ? VIDEO : null}
            </div>
            <div className="aimer">
                <img src="/images/camera-frame.svg" alt="Camera frame" />
            </div>
            <div className="capture-bar">
                <ImageButton width={55} icon="/images/camera-photos.svg" />
                <ImageButton width={70} icon="/images/camera-capture.svg" onclick={() => setPaused(true)} />
                <ImageButton width={55} icon="/images/camera-flip.svg" />
            </div>
        </div>
    </div>;
}

export default CameraOutput;