import { Form, redirect, useActionData } from "react-router-dom"

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const { name, email } = data;

  const errors = {};

  if(typeof name !== "string" || name.length < 3) {
    errors.name = "name must be > 3 characters"
  }

  if(typeof email !== "string" || email.length < 3) {
    errors.email = "email must be > 3 characters"
  }

  if(Object.keys(errors).length) {
    return errors
  }

  const res = await fetch(`http://localhost:3001/users`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const newUser = await res.json()

  return redirect(`/users/${newUser.id}`)
}

export default function NewUser() {
  const errors = useActionData();
  return (
    <Form method="post">
      <p>
        <label>
          Name
          <br />
          <input type="text" name="name" />
          {errors?.name && <span>{errors.name}</span>}
        </label>
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <br />
        <textarea
          id="email"
          name="email"
          rows="10"
          cols="30"
        />
        {errors?.email && <span>{errors.email}</span>}
      </p>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  )
}