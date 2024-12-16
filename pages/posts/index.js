import dynamic from "next/dynamic";
import styles from "./styles.module.css";
const LayoutDynamic = dynamic(() => import("@/layout"), { ssr: false });
export default function Posts({ posts }) {
    console.log('posts data => ', posts);
    return (
        <>
            <LayoutDynamic metaTitle={"Posts"} metaDescription={"Posts"} >
                <p>Posts</p>
                {posts.map((item) => (
                    <div key={item.id}>
                        <h1 className={styles.title}>{item.title}</h1>
                        <p>{item.body}</p>
                    </div>
                ))}
            </LayoutDynamic>
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return { props: { posts } }
}
