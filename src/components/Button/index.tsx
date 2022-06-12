import { ButtonContainer } from "./styles";

type ButtonProps = {
    text: string;
    icon: any;
    onClick: any;
};

const Button = ({ text, icon, onClick }: ButtonProps) => {
    return (
        <ButtonContainer onClick={onClick}>
            <div className="icon">{icon}</div>
            <span className="text">{text}</span>
        </ButtonContainer>
    );
};

export default Button;
