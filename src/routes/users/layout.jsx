import { Outlet, Link } from "react-router-dom";

export default function UsersLayout() {
  return (
    <div>
      <Link to="/users/new">New User</Link>
      <hr />
      <Outlet />
    </div>
  )
}