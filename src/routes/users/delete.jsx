import { redirect, Form } from "react-router-dom"

export async function action({ params }) {
  await fetch(`http://localhost:3001/users/${params.userId}`, {
    method: "DELETE"
  })

  return redirect("/users")
}

export default function UserDelete() {
  return (
    <div>
      <Form method="post">
        <button type="submit">Delete this user</button>
      </Form>
    </div>
  )
}