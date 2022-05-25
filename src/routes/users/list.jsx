import { useLoaderData, Link, useNavigation } from "react-router-dom"

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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                  >
                    Name
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{user.email}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">     
                      <Link to={`/users/${user.id}`} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </Link>
                      &nbsp;{(navigation.state === "loading" && navigation.location.pathname === `/users/${user.id}`) && <span>(fetching user...)</span>}
                    </td>
                  </tr>
                ))}
                <tr key="broken.user@me.com">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">
                    A broken user
                  </td> 
                  <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">broken.user@me.com</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 md:pr-0">     
                      <Link to={`/users/broken-user`} className="text-blue-600 hover:text-blue-900">
                        Edit
                      </Link>
                      &nbsp;{(navigation.state === "loading" && navigation.location.pathname === `/users/broken-user`) && <span>(fetching user...)</span>}
                    </td>                                   
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>    
  )
}