import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/projects/create">Go to /projects/create</Link>
    </main>
  );
}
