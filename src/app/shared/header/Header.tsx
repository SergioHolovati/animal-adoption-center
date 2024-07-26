import { useNavigate } from 'react-router-dom';
import './header.css'
export const Header = () => {

    const navigate = useNavigate();

    const home = () => {
        navigate("/dashboard");
    };
    const newPet = () => {
        navigate("/new-pet");
    };

    return (
        <header id="header">
            <div id="header-right">
                <a id="active" onClick={home}>Home</a>
                <a onClick={newPet}>New pet</a>
            </div>
        </header>
    )
}