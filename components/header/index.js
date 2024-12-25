import Link from "next/link";
import styles from "./styles.module.css";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { mutate } from "swr";
import {useRouter} from "next/router";
import { useMutation } from "@/hooks/useMutation";

export default function Header() {
    const router = useRouter();
    const { mutate } = useMutation();
    const { data, isLoading, isError } = useQueries({
        prefixUrl: "https://service.pace-unv.cloud/api/user/me",
        headers: { Authorization: `Bearer ${Cookies.get("user_token")}` },
    });

    const HandleLogout = async () => {
        console.log("Logout");
        const response = await mutate({ url: "https://service.pace-unv.cloud/api/logout", method: "POST", headers: { Authorization: `Bearer ${Cookies.get("user_token")}` } });
        console.log("response => ", response);
        if (!response?.success) {
            console.log("Logout failed");
        }else{
            Cookies.remove("user_token");
            router.push("/login");
        }
    };

    return (
        <div className={styles.header}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/notes">Notes</Link></li>
                <li>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {data?.data?.name || (isLoading ? "Loading..." : "Guest")}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => HandleLogout()}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </li>
            </ul>
            {isError && <p style={{ color: "red" }}>Error loading user data.</p>}
        </div>
    );
}
