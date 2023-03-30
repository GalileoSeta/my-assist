import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Menu from '../components/Menu';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Next.js Webapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Menu />
        <h1 className={styles.title}>Welcome to my Next.js Webapp</h1>

        <p className={styles.description}>
          This is a demo of how we can use open source tools to build a webapp
          that includes speech-to-text, image recognition, natural language
          processing, and more.
        </p>

        <a href="/live-chat" class="btn">
          Live Chat
        </a>

        {/* Add UI components here */}
      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </footer>
    </div>
  );
}
