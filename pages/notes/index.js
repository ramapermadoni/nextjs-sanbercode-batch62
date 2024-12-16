import dynamic from "next/dynamic";
import styles from "./styles.module.css";
import Link from "next/link";
const LayoutDynamic = dynamic(() => import("@/layout"), { ssr: false });
export default function Notes({ notes }) {
    console.log('notes data => ', notes);
    return (
        <>
            <LayoutDynamic metaTitle={"Notes"} metaDescription={"Notes"} >
                {
                    notes.quotes.map((note) => {
                        return (
                            <Link href={`/notes/${note.id}`} key={note.id}>
                                <div className={styles.quote} key={note.id}>
                                    <h1>&ldquo;{note.quote}&ldquo;</h1>
                                    <p className={styles.author}>~{note.author}~</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </LayoutDynamic>
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/quotes')
    const notes = await res.json()
    return { props: { notes }, revalidate: 10 }
    //revalidate digunakan untuk memperbarui data setiap 10 detik
}