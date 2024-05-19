import "@/styles/loadingscreen.css";

interface LoadingScreenProps {
    appLoaded: boolean;
}

function LoadingScreen({ appLoaded }: LoadingScreenProps) {
    return (
        <div className={"loading-screen " + (appLoaded ? "loaded" : "")}>
            <div className="loading">
                <img src="/images/logo.png" width="50px"/>
                <span>Loading</span>
            </div>
        </div>    
    );
}

export default LoadingScreen;