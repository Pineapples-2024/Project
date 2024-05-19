import BasicButton from "@/components/BasicButton";
import CameraOutput from "@/components/CameraOutput";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import { useRef, useState } from "react";

import "@/styles/home.css"

interface BigTextProps {
    label: string;
}
function BigText({ label }: BigTextProps) {
    const text = label.split(" ");
    
    return <div className="big-text">
        <span style={{ "color": "#3a338a", "textDecoration": "underline" }}>{text[0]}</span>
        <span style={{ "color": "#0c064f" }}>&nbsp;{text.splice(1).join(" ")}</span>
    </div>
}

interface CaptionProps {
    label: string;
}
function Caption({ label }: CaptionProps) {
    return <p className="caption-text">{label}</p>
}

function HomePage() {
    const [ cameraActive, setCameraActive ] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    return <>
        <CameraOutput active={cameraActive} setActive={setCameraActive} />
        
        <header>
            <section>
                <Navigation focused="home" />
                <BigText label="Visualize your learning." />
                <Caption label="Start by uploading an image or taking one!" />
                <div className="button-row">
                    <BasicButton
                        icon="/images/upload.svg"
                        label="Upload an image"
                        color="#fbe28b"
                        onclick={() => {
                            inputRef.current?.click();
                        }}
                    />
                    <BasicButton
                        icon="/images/camera.svg"
                        label="Take a picture"
                        color="#cac5ff"
                        onclick={() => {
                            setCameraActive(true);
                        }}
                    />

                    <input max={3} onChange={event => {
                        function _arrayBufferToBase64( buffer: any ) {
                            var binary = '';
                            var bytes = new Uint8Array( buffer );
                            var len = bytes.byteLength;
                            for (var i = 0; i < len; i++) {
                                binary += String.fromCharCode( bytes[ i ] );
                            }
                            return window.btoa( binary );
                        }

                        const input = event.target;
                        
                        for (let i = 0;i < input.files!.length;i++) {
                            input.files![i].arrayBuffer().then(stream => {
                                console.log(_arrayBufferToBase64(stream))
                            });
                        }
                    }} ref={inputRef} type="file" accept=".png,.jpg" style={{ display: "none" }} />
                </div>
                <Caption label="Don't have anything to reference? No worries!" />
            </section>

            <section>
                <SearchBar />
            </section>
        </header>
    </>;
}

export default HomePage;