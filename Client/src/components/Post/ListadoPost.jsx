import { useEffect,useState } from "react"
import { usePostStore } from "../../stores/usePostStore"
import CardPost from "./CardPost"


export default function ListadoPost() {

    const {posts, getAllPosts} = usePostStore()

    useEffect(() => {
         getAllPosts()
    }, [])

    if (posts.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Listado de post</h1>
            {posts && posts.map((post) => (
                <CardPost key={post.id} post={post} index={post.id} />
            ))}
        </div>
    )
}