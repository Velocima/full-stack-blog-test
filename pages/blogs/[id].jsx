import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps({ params }) {
	const postData = await fetch('http://localhost:4000/api/blogs', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((posts) =>
			posts.blogs.filter((blog) => blog.title === params.id.split('_').join(' '))
		)
		.then((post) => post[0]);
	return {
		props: {
			postData,
		},
	};
}

export async function getStaticPaths() {
	const blogs = await fetch('http://localhost:4000/api/blogs', {
		method: 'GET',
	}).then((res) => res.json());

	const paths = await blogs.blogs.map((page) => {
		return { params: { id: page.title.split(' ').join('_') } };
	});
	return {
		paths,
		fallback: false,
	};
}

export default function Post({ postData }) {
	console.log(postData);
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<main>
				<h1>{postData.title}</h1>
				<p>{postData.content}</p>
				<Link href='/'>
					<a>Home</a>
				</Link>
			</main>
		</>
	);
}
