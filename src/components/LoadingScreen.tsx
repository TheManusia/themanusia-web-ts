import {useState} from "react";

export const LoadingScreen = ({loaded, onLoad}: { loaded: boolean, onLoad: Function }) => {
    const [bodyLoaded, setBodyLoaded] = useState("");

    const onClick = () => {
        document.body.classList.add('loaded');
        setBodyLoaded("loaded");
        onLoad();
    }

    return (
        <div className={`overlay ${bodyLoaded}`}>
            <div className="overlayDoor"></div>
            <div className={`overlayContent ${loaded ? "is-loading" : "content-loaded" }`}>
                <div className="loader">
                    <div className="inner"></div>
                </div>
                <div className="content">
                    <h1 className="text-white font-bold">
                        WELCOME TO AMBATUNAT
                    </h1>
                </div>
                <div className="skip" onClick={onClick}>Enter</div>
            </div>
        </div>

    )
}