import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "@chakra-ui/react";

import InputFloating from "../../components/InputFloating";
import { AuthContext } from "../../contexts/AuthContext";

import { BoxContent, BtnSignIn, Container, Header, MainContent, RegisterLink } from "./styles";

export type SignInInputs = {
    username: string;
    password: string;
};

const schema = yup
    .object({
        username: yup.string().required("Nome obrigatório!"),
        password: yup.string().required("Senha obrigatória!"),
    })
    .required();

const SignIn: React.FC = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isUsernameActive, setisUsernameActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const {
        register,
        handleSubmit,
        resetField,
        control,
        watch,
        formState: { errors },
    } = useForm<SignInInputs>({ resolver: yupResolver(schema) });
    const usernameWatch = watch("username");
    const passwordWatch = watch("password");

    useEffect(() => {
        if (usernameWatch === "" || usernameWatch === undefined || usernameWatch === null) {
            return setisUsernameActive(false);
        }

        return setisUsernameActive(true);
    }, [usernameWatch]);

    useEffect(() => {
        if (passwordWatch === "" || passwordWatch === undefined || passwordWatch === null) {
            return setIsPasswordActive(false);
        }

        return setIsPasswordActive(true);
    }, [passwordWatch]);

    const onSubmit: SubmitHandler<any> = async (data: SignInInputs) => {
        const isLogged = await signIn(data);

        if (isLogged) {
            navigate("/projetos");
        }
    };

    return (
        <Container>
            <BoxContent>
                <Header>
                    <h4>Iniciar sessão</h4>
                    <span>Seja bem-vindo ao Protostar!</span>
                </Header>
                <MainContent>
                    <form id="form_sign_in" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputFloating
                                    {...field}
                                    type="text"
                                    label="NOME DE USUÁRIO"
                                    isActive={isUsernameActive}
                                />
                            )}
                        />
                        {errors.username && <div className="error">{errors.username.message}</div>}
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputFloating
                                    {...field}
                                    type="password"
                                    label="SENHA"
                                    isActive={isPasswordActive}
                                />
                            )}
                        />
                        {errors.password && <div className="error">{errors.password.message}</div>}
                    </form>
                </MainContent>
                <BtnSignIn type="submit" form="form_sign_in">
                    Entrar
                </BtnSignIn>
                <Divider marginBottom="20px" />
                <RegisterLink>
                    <span>Não possui uma conta?</span>
                    <NavLink to="/cadastro">Crie uma conta</NavLink>
                </RegisterLink>
            </BoxContent>
        </Container>
    );
};

export default SignIn;
