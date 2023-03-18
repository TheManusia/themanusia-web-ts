import {useState, useEffect} from "react";
import {Button} from "./Button";

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

export const Content = ({onPause}: { onPause: Function }) => {
    const [time, setTime] = useState(getTime);
    const [play, setPlay] = useState(false);

    useEffect(() => {
            const interval = setInterval(() => {
                setTime(getTime);
            }, 1000);
            return () => clearInterval(interval);
        }, []);

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
            <div className="absolute z-30 text-white text-base pause p-5"
                 onClick={() => setPlay(onPause())}>[ {play ? "play" : "pause"} ]
            </div>
        </div>
    )
}