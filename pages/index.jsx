import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/index.module.css';

export async function getStaticProps(context) {
	const blogs = await fetch('http://localhost:4000/api/blogs', {
		method: 'GET',
	}).then((res) => res.json());
	return {
		props: {
			pages: blogs,
		}, // will be passed to the page component as props
	};
}

export default function Home(props) {
	// console.log(props);
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<h1>Moshi Moshi. Blog Desu.</h1>
				<ul>
					{props.pages.blogs.map((page) => (
						<li key={page.title.split(' ').join('_')}>
							<Link href={`/blogs/${page.title.split(' ').join('_')}`}>
								<a>{page.title}</a>
							</Link>
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
