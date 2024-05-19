
interface BasicButtonProps {
    color: string;
    icon: string;
    label: string;
    onclick?: () => void
}

function BasicButton({ label, color, icon, onclick = ()=>{} }: BasicButtonProps) {
    return (
        <button className="basic-button" style={{ "background": color }} onClick={onclick}>
            <img width="40" height="40" src={icon}/>
            <span>{label}</span>
        </button>
    );
}

export default BasicButton;