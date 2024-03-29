import { FormLabel, Grid, GridItem, Input } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { Background, BtnSignUp, Container, ErrorMessage, Header, SignInLink } from "./styles";
import { UserFunctionEnum } from "../../util/Enums";

type SignUpInputs = {
    // name: string;
    // last_name: string;
    username: string;
    email: string;
    role: string;
    password: string;
    confirmation_password: string;
};

type UserData = {
    id: number;
    username: string;
    password: string;
    email: string;
};

const schema = yup
    .object({
        username: yup.string().required("Nome de usuário obrigatório!"),
        email: yup.string().email().required("Email obrigatório!"),
        role: yup.string().required("Cargo obrigatório!"),
        password: yup
            .string()
            .min(8, "Senha deve ter no mínimo 8 caracteres")
            .required("Senha obrigatória!"),
        confirmation_password: yup
            .string()
            .oneOf([yup.ref("password"), null], "Senhas não conferem"),
    })
    .required();

const SignUp: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>({ resolver: yupResolver(schema) });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data: SignUpInputs) => {
        const registerUserData = {
            username: data.username,
            password: data.password,
            email: data.email,
        };

        let user = {} as UserData;
        await axios
            .post(`${process.env.REACT_APP_API_URL}/usuarios/`, registerUserData, {
                headers: {
                    Authorization: `Token ${process.env.REACT_APP_ADMIN_TOKEN}`,
                },
            })
            .then((response) => {
                user = response.data;
            })
            .catch((error) => {
                if (
                    error.response.data.username[0] === "A user with that username already exists."
                ) {
                    return toast.error("Usuário já possui cadastro!");
                }
                return toast.error("Houve um erro no cadastro");
            });

        if (user.id) {
            let registerFunctionData = {
                cargo: data.role,
                funcao_usuario: UserFunctionEnum.usuario,
                usuario: user.id,
            };

            await axios
                .post(`${process.env.REACT_APP_API_URL}/funcao/`, registerFunctionData, {
                    headers: {
                        Authorization: `Token ${process.env.REACT_APP_ADMIN_TOKEN}`,
                    },
                })
                .then(() => {
                    toast.success("Conta cadastrada com sucesso!");
                    navigate("/");
                })
                .catch((error) => {
                    toast.error("Houve um erro no cadastro");
                });
        }
    };

    return (
        <Background>
            <Container>
                <Header>
                    <h3>Criar uma conta</h3>
                    <SignInLink>
                        <span>Já possui uma conta?</span>
                        <NavLink to="/">Entrar</NavLink>
                    </SignInLink>
                </Header>
                <form id="form_sign_up" onSubmit={handleSubmit(onSubmit)}>
                    {/* <Grid templateColumns="repeat(2, 1fr)" gap={5} marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="name">Nome</FormLabel>
                            <Input type="text" id="name" focusBorderColor="#fab039" />
                        </GridItem>
                        <GridItem>
                            <FormLabel htmlFor="last_name">Sobrenome</FormLabel>
                            <Input type="text" id="last_name" focusBorderColor="#fab039" />
                        </GridItem>
                    </Grid> */}
                    <Grid marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="username">Nome de usuário</FormLabel>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Digite seu nome de usuário"
                                {...register("username")}
                                focusBorderColor="#fab039"
                            />
                            {errors.username && (
                                <ErrorMessage>{errors.username.message}</ErrorMessage>
                            )}
                        </GridItem>
                    </Grid>
                    <Grid marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="email">E-mail</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Digite seu email"
                                {...register("email")}
                                focusBorderColor="#fab039"
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </GridItem>
                    </Grid>
                    <Grid marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="role">Cargo</FormLabel>
                            <Input
                                type="text"
                                id="role"
                                placeholder="Digite seu cargo (Ex: Desenvolvedor)"
                                {...register("role")}
                                focusBorderColor="#fab039"
                            />
                            {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
                        </GridItem>
                    </Grid>
                    {/* <Grid templateColumns="repeat(2, 1fr)" gap={5} marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="birthday">Data de Nascimento</FormLabel>
                            <Input type="date" id="birthday" focusBorderColor="#fab039" />
                        </GridItem>
                        <GridItem>
                            <FormLabel htmlFor="role">Cargo</FormLabel>
                            <Input type="text" id="role" focusBorderColor="#fab039" />
                        </GridItem>
                    </Grid> */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <Input
                                id="password"
                                pr="4.5rem"
                                type="password"
                                placeholder="Digite sua senha"
                                {...register("password")}
                                focusBorderColor="#fab039"
                            />
                            {errors.password && (
                                <ErrorMessage>{errors.password.message}</ErrorMessage>
                            )}
                        </GridItem>
                        <GridItem>
                            <FormLabel htmlFor="conf_password">Confirmar senha</FormLabel>
                            <Input
                                id="conf_password"
                                pr="4.5rem"
                                type="password"
                                placeholder="Confirme a senha"
                                {...register("confirmation_password")}
                                focusBorderColor="#fab039"
                            />
                            {errors.confirmation_password && (
                                <ErrorMessage>{errors.confirmation_password.message}</ErrorMessage>
                            )}
                        </GridItem>
                    </Grid>
                </form>
                <div>
                    <BtnSignUp type="submit" form="form_sign_up">
                        Cadastrar
                    </BtnSignUp>
                </div>
            </Container>
        </Background>
    );
};

export default SignUp;
