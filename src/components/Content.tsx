import {useState, useEffect} from "react";
import {Button} from "./Button";

function getTime() {
    const today = new Date()
    return twoDigitsNumber(today.getHours())
        + ':' + twoDigitsNumber(today.getMinutes())
        + ':' + twoDigitsNumber(today.getSeconds());
}

function twoDigitsNumber(number: any) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}

function removeComma(number: any) {
    return `${twoDigitsNumber(parseInt(number))}`;
}

export const Content = ({onPause, title, duration, currentTime,}:
                            { onPause: Function, title?: string, duration: number, currentTime: number }) => {
    const [time, setTime] = useState(getTime);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timelapse =`${removeComma(currentTime / 60)}:${removeComma(currentTime % 60)} / ${removeComma(duration / 60)}:${removeComma(duration % 60)}`;

    return (
        <div className="text-white">
            <div className="absolute z-20 text-center flex h-screen w-screen">
                <div className="m-auto">
                    <h1 className="japanese text-9xl mb-16">人間</h1>
                    <h1 className="text-4xl font-bold mb-0">TheManusia</h1>
                    <h1 className="text-xl mt-0">{time}</h1>
                    <div className="col-auto">
                        <Button url="https://github.com/TheManusia" text="Github"/>
                        <Button url="https://twitter.com/TheManusia_" text="Twitter"/>
                        <Button url="https://instagram.com/ian_269" text="Instagram"/>
                        <Button url="https://discord.com/users/320376899069149184" text="Discord"/>
                        <Button url="https://steamcommunity.com/id/themanusia" text="Steam"/>
                        <Button url="https://osu.ppy.sh/u/TheManusia" text="osu!"/>
                    </div>
                </div>
            </div>
            <div className="absolute z-30 text-white text-base p-5">
                <div className="pause" onClick={() => setPlay(onPause())}>
                    [ {play ? "play" : "pause"} ]
                </div>
            </div>
            <div className="absolute bottom-0 left-0 p-5">
                <div className="text-base text-white">
                    {currentTime ? `[ ${timelapse} ]` : ""}
                </div>
                <div className="text-base text-white">
                    {title ? `[ ${title} ]` : ""}
                </div>
            </div>
        </div>
    )
}