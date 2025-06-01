import Link from "next/link"

export default async function PostsPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: {
            revalidate: 60, // Revalidar cada 60 segundos
        },
        cache: "default"
    }
    )
    const posts = await res.json()

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href= {`/posts/${post.id}`}>
                        {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}