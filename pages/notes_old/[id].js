import dynamic from "next/dynamic";
import styles from "./styles.module.css";
const LayoutDynamic = dynamic(() => import("@/layout"), { ssr: false });
export default function DetailNotes({ notes }) {
    console.log('notes data => ', notes);
    return (
        <>
            <LayoutDynamic metaTitle={"Notes"} metaDescription={"Notes"} >
                <div className={styles.quote}>
                    <h1>Detail Notes</h1>
                    <p><strong>ID : </strong>{notes.id}</p>
                    <p><strong>Quote : </strong><br />{notes.quote}</p>
                    <p><strong>Author : </strong><br />{notes.author}</p>

                </div>
            </LayoutDynamic>
        </>
    );
}
export async function getStaticPaths() {
    const res = await fetch('https://dummyjson.com/quotes');
    const notes = await res.json();

    const paths = notes.quotes.map((item) => ({ params: { id: item.id.toString() } }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { id } = context.params;
    const res = await fetch(`https://dummyjson.com/quotes/${id}`);
    const notes = await res.json();
    return { props: { notes }, revalidate: 10 };
}