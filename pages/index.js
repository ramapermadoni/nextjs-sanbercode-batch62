
import Image from "next/image";
import { useEffect } from "react";

import dynamic from "next/dynamic";
const LayoutDynamic = dynamic(() => import("@/layout"), { ssr: false });


export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }, [])
  return (
    <>
      <LayoutDynamic metaTitle={"Home"} metaDescription={"Ini adalah halaman utama website"}>
        <p>Home</p>
        <div style={{ position: "relative", height: "200px", maxHeight: "200px", width: "200px" }}>
          <Image src="/nextjs.png" alt="Next.js Logo" fill style={{ objectFit: "contain" }} />
        </div>

        {/* ini paling recomended, tapi tidak merusak ratio meskipun definisi height dan width nya sama*/}
        <Image src="/nextjs.png" alt="Next.js Logo" height={200} width={200} />


        {/* <img
          src="/nextjs.png" style={{ width: "200px" }} alt="Next.js Logo" /> */}
      </LayoutDynamic>
    </>
  );
}
