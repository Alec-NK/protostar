import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider } from "@chakra-ui/react";

import InputFloating from "../../components/InputFloating";
import { AuthContext } from "../../contexts/AuthContext";

import { BoxContent, BtnSignIn, Container, Header, MainContent, RegisterLink } from "./styles";

type SignInInputs = {
    email: string;
    password: string;
};

const schema = yup
    .object({
        email: yup.string().email("Email inválido!").required("Email obrigatório!"),
        password: yup.string().required("Senha obrigatória!"),
    })
    .required();

const SignIn: React.FC = () => {
    const { signIn } = useContext(AuthContext);
    const [isEmailActive, setIsEmailActive] = useState(false);
    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const {
        register,
        handleSubmit,
        resetField,
        control,
        watch,
        formState: { errors },
    } = useForm<SignInInputs>({ resolver: yupResolver(schema) });
    const emailWatch = watch("email");
    const passwordWatch = watch("password");

    useEffect(() => {
        if (emailWatch === "" || emailWatch === undefined || emailWatch === null) {
            return setIsEmailActive(false);
        }

        return setIsEmailActive(true);
    }, [emailWatch]);

    useEffect(() => {
        if (passwordWatch === "" || passwordWatch === undefined || passwordWatch === null) {
            return setIsPasswordActive(false);
        }

        return setIsPasswordActive(true);
    }, [passwordWatch]);

    useEffect(() => {
        console.log("Erros", errors);
    }, [errors]);

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log("Submit", data);
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
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputFloating
                                    {...field}
                                    type="email"
                                    label="E-MAIL"
                                    isActive={isEmailActive}
                                />
                            )}
                        />
                        {errors.email && <div className="error">{errors.email.message}</div>}
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
