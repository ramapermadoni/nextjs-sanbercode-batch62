import { Button, Flex, FormControl, Heading, Input, Stack, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function Login() {
    const router = useRouter();
    const toast = useToast();
    const { mutate } = useMutation();
    const [payload, setPayload] = useState({ email: "", password: "" });

    const HandleSubmit = async () => {
        const response = await mutate({ url: "https://service.pace-unv.cloud/api/login", payload });
        if (!response?.success) {
            toast({
                title: "Login Gagal",
                description: "Email atau password salah",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } else {
            Cookies.set("user_token", response?.data?.token, { expires: new Date(response?.data?.expires_at), path: '/' });
            router.push('/');
        }
    };
    return (<Flex alignItems={"center"} justifyContent={"center"} h={"100vh"}>
        <Stack direction={"column"} spacing={8}>
            <Heading as={"h4"}>Login</Heading>
            <FormControl>
                <Input type={"text"} placeholder={"email"} value={payload.email} onChange={(event) => setPayload({ ...payload, email: event.target.value })} />
            </FormControl>
            <FormControl>
                <Input type={"password"} placeholder={"password"} value={payload.password} onChange={(event) => setPayload({ ...payload, password: event.target.value })} />
            </FormControl>
            <FormControl>
                <Button onClick={() => HandleSubmit()}>Login</Button>
            </FormControl>
        </Stack>
    </Flex>);
}