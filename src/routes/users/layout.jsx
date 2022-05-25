import { Outlet } from "react-router-dom";

export default function UsersLayout() {
  return (
    <div className="pt-12">
      <Outlet />
    </div>
  )
}