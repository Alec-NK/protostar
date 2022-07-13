import { Container } from "./styles";

type InputFloatingProps = {
    type: string;
    label: string;
    isActive: boolean;
};

const InputFloating = ({ type, isActive, label, ...rest }: InputFloatingProps) => {
    return (
        <Container>
            <input type={type} {...rest} />
            <label className={isActive ? "Active" : ""} htmlFor={type}>
                {label}
            </label>
        </Container>
    );
};

export default InputFloating;
