import { Outlet } from "react-router-dom";

export async function loader({ params }) {
  const res = await fetch(`http://localhost:4001/users/${params.userId}`)

  if (res.status === 404) {
    throw new Response("Not found", { status: 404 })
  }

  return res.json()
}

export default function UserLayout() {
  return (    
    <Outlet />    
  )
}