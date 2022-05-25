import { DataBrowserRouter, Route } from "react-router-dom";

import Layout from "./Layout";

import ErrorBoundary from "./routes/error-boundary"
import UsersLayout from './routes/users/layout'
import Users, { loader as usersLoader } from './routes/users/list'
import NewUser, { action as newUserAction } from "./routes/users/new"
import UserDetails from "./routes/users/user/detail"
import UserDelete, { action as deleteUserAction } from "./routes/users/user/delete"
import UserLayout, { loader as userLoader } from './routes/users/user/layout'

function App() {
  return (
    <DataBrowserRouter>
      <Route path="/" element={<Layout />} id="root">
        <Route path="/users" element={<UsersLayout />} errorElement={<ErrorBoundary />}>
          <Route index element={<Users />} loader={usersLoader} id="Users" />
          <Route path="/users/new" element={<NewUser />} action={newUserAction} />
          <Route path="/users/:userId" element={<UserLayout />} loader={userLoader} id="UserDetails">
            <Route index element={<UserDetails />} />
            <Route path="/users/:userId/delete" element={<UserDelete />} action={deleteUserAction} />
          </Route>
        </Route>
      </Route>      
    </DataBrowserRouter>    
  )
}

export default App