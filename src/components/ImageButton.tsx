interface ImageButtonProps {
    icon: string;
    width?: number;
    height?: number;
    onclick?: () => void;
}
function ImageButton({ icon, width, height, onclick = () => {} }: ImageButtonProps) {
    return <button className="image-button" onClick={onclick}>
        <img width={width} height={height} src={icon}/>
    </button>
}

export default ImageButton;