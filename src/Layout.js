import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="p-3">
      <h1>React Router Tests</h1>
      <Link to="/users">Users</Link>
      <hr />
      <Outlet />
    </div>
  )
}