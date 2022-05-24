import { useLoaderData, Link } from "react-router-dom"


export async function loader({ params }) {
  const res = await fetch(`http://localhost:3001/users/${params.userId}`)

  if (res.status === 404) {
    throw new Response("Not found", { status: 404 })
  }

  return res.json()
}

export default function Details() {
  const user = useLoaderData()  
  
  return (
    <>
      <h2>{user.name}</h2>
      <Link to={`delete`}>Delete</Link>
    </>
  )

}