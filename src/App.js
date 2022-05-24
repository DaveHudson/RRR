import { DataBrowserRouter, Route } from "react-router-dom";

import Layout from "./Layout";

import ErrorBoundary from "./routes/error-boundary"
import UsersLayout from './routes/users/layout'
import Users, { loader as usersLoader } from './routes/users/list'
import NewUser, { action as newUserAction } from "./routes/users/new"
import UserDetails, { loader as userLoader } from "./routes/users/detail"
import UserDelete, { action as deleteUserAction } from "./routes/users/delete"

function App() {
  return (
    <DataBrowserRouter>
      <Route path="/" element={<Layout />}>
        <Route path="users" element={<UsersLayout />} errorElement={<ErrorBoundary />}>
          <Route index element={<Users />} loader={usersLoader} />
          <Route path="new" element={<NewUser />} action={newUserAction} />
          <Route path=":userId" element={<UserDetails />} loader={userLoader} />
          <Route path=":userId/delete" element={<UserDelete />} action={deleteUserAction} />
        </Route>
      </Route>      
    </DataBrowserRouter>    
  )
}

export default App