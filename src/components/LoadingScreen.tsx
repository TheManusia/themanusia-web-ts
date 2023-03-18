import {useState, useEffect} from "react";

function getTime() {
    var today = new Date()
    return today.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + ':' + today.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + ':' + today.getSeconds().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}

export const LoadingScreen = ({loaded, onLoad}: { loaded: boolean, onLoad: Function }) => {
    var [time, setTime] = useState(getTime);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [bodyLoaded, setBodyLoaded] = useState("");

    const onClick = () => {
        document.body.classList.add('loaded');
        setBodyLoaded("loaded");
        onLoad();
    }

    return (
        <div className={`overlay ${bodyLoaded}`}>
            <div className="overlayDoor"></div>
            <div className={`overlayContent ${loaded ? "is-loading" : "content-loaded"}`}>
                <div className="loader">
                    <div className="inner"></div>
                </div>
                <div className="content">
                    <h1 className="text-white font-bold">
                        WELCOME TO AMBATUNAT
                    </h1>
                    <h2 className="text-white clock">{time}</h2>
                </div>
                <div className="skip" onClick={onClick}>Enter</div>
            </div>
        </div>

    )
}