export const Button = ({text, url}: { text: string, url: string }) => {

    const onClick = () => {
        window.open(url);
    }

    return (
        <button onClick={onClick} className="bg-white text-black font-bold py-1 px-3 ml-5 mb-5 btn-link text-sm">{text}</button>
    )
}