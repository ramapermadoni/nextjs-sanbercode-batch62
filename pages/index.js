import Layout from "@/layout";
import { useEffect } from "react";


export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <Layout metaTitle={"Home"} metaDescription={"Ini adalah halaman utama website"}>
        <p>Home</p>
      </Layout>
    </>
  );
}
