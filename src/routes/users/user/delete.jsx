import { redirect, Form, useRouteLoaderData, useNavigation } from "react-router-dom"

export async function action({ params }) {
  await fetch(`http://localhost:3001/users/${params.userId}`, {
    method: "DELETE"
  })

  return redirect("/users")
}

export default function UserDelete() {
  const navigation = useNavigation();
  const user = useRouteLoaderData("UserDetails");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 truncate">Delete</h1>
      <p>Are you sure you want to delete the user {user.name}?</p>
      <hr className="p-2" />
      <Form method="post">
        <button type="submit" className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          {navigation.state === "idle" && 'Yes, delete!!'}
          {navigation.state === "submitting" && 'Deleting...'}
          {navigation.state === "loading" && "Deleted!"}          
        </button>
      </Form>
    </div>
  )
}