import "./index.css";

// loading page
function Loading() {
    return (
        <>
            <div className="loading-screen">
                <div className="loading">
                    <img src="../public/images/logo.png" width="30px">
                    </img>
                    <span>Loading</span>
                </div>
            </div>    
        </>
    );
}

export default Loading;
