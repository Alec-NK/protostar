import { ButtonContainer } from "./styles";

type ButtonProps = {
    text: string;
    icon: any;
};

const Button = ({ text, icon }: ButtonProps) => {
    return (
        <ButtonContainer>
            <div className="icon">{icon}</div>
            <span className="text">{text}</span>
        </ButtonContainer>
    );
};

export default Button;
