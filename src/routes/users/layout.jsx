import { Outlet } from "react-router-dom";

export async function loader() {
  const res = await fetch(`http://localhost:3001/users`)

  if(res.status === 404) {
    throw new Response("Not found", { status: 404})
  }

  return res.json()
}

export default function UsersLayout() {
  return (
    <div className="pt-12">
      <Outlet />
    </div>
  )
}