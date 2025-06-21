import logoImg from "../assets/logo.png"
export default function Header(){
    return (
        <header>
            <img src={logoImg} alt="" />
            <button>Home</button>
        </header>
    )
}