import { useState } from "react";
import {
    Button,
    FormLabel,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { Background, BtnSignUp, Container, Header, SignInLink } from "./styles";

type SignUpProps = {
    name: string;
    last_name: string;
    email: string;
    role: {
        id: string;
        label: string;
    };
    password: string;
    confirmation_password: string;
};

const SignUp: React.FC = () => {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        resetField,
        control,
        watch,
        formState: { errors },
    } = useForm<SignUpProps>();

    const handleClick = () => setShow(!show);

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log("Submit", data);
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
                <form id="form_sign_up">
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="name">Nome</FormLabel>
                            <Input type="text" id="name" focusBorderColor="#fab039" />
                        </GridItem>
                        <GridItem>
                            <FormLabel htmlFor="last_name">Sobrenome</FormLabel>
                            <Input type="text" id="last_name" focusBorderColor="#fab039" />
                        </GridItem>
                    </Grid>
                    <Grid marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="email">E-mail</FormLabel>
                            <Input type="email" id="email" focusBorderColor="#fab039" />
                        </GridItem>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="birthday">Data de Nascimento</FormLabel>
                            <Input type="date" id="birthday" focusBorderColor="#fab039" />
                        </GridItem>
                        <GridItem>
                            <FormLabel htmlFor="role">Cargo</FormLabel>
                            <Input type="text" id="role" focusBorderColor="#fab039" />
                        </GridItem>
                    </Grid>
                    <Grid templateColumns="repeat(2, 1fr)" gap={5} marginBottom="20px">
                        <GridItem>
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <Input
                                id="password"
                                pr="4.5rem"
                                type="password"
                                placeholder="Digite sua senha"
                                focusBorderColor="#fab039"
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel htmlFor="conf_password">Confirmar senha</FormLabel>
                            <Input
                                id="conf_password"
                                pr="4.5rem"
                                type="password"
                                placeholder="Confirme a senha"
                                focusBorderColor="#fab039"
                            />
                        </GridItem>
                    </Grid>
                </form>
                <div>
                    <BtnSignUp type="submit">Cadastrar</BtnSignUp>
                </div>
            </Container>
        </Background>
    );
};

export default SignUp;
