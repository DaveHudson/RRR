import { Outlet, useLoaderData, Link, useNavigation } from "react-router-dom"

export async function loader() {
  const res = await fetch(`http://localhost:3001/users`)

  if(res.status === 404) {
    throw new Response("Not found", { status: 404})
  }

  return res.json()
}

export default function Users() {
  const navigation = useNavigation();
  const users = useLoaderData()

  return (
    <>
      <h1>List of Users</h1>

      {users.map((user) => {
        return <div key={user.name}>
          <Link to={`/users/${user.id}`}>{user.name}</Link> {(navigation.state === "loading" && navigation.location.pathname === `/users/${user.id}`) && <span>(loading...)</span>}
        </div>
      })}
      <Outlet />
    </>
    
  )
}