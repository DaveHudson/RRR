import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { ExclamationCircleIcon } from '@heroicons/react/solid'

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

  const res = await fetch(`http://localhost:4001/users`, {
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
  const navigation = useNavigation();
  const errors = useActionData();
  
  return (
    <>
     <h1 className="text-2xl font-bold text-gray-900 truncate">Create a user</h1>
      <Form method="post" className="space-y-8 mt-4 max-w-md" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="name"
              id="name"
              className={errors?.name ? `block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md` : `shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:opacity-50`}
              disabled={navigation.state !== "idle" ? true : false}
              autoComplete="no"
              required
              pattern="[A-Za-z]{4}"
              title="Upper or lowercase, 4 characters"
            />
            {errors?.name && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" /></div>}
          </div>
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors?.name && <span>{errors.name}</span>}
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="email"
              name="email"
              id="email"
              className={errors?.email ? `block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md` : `shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:opacity-50`}
              placeholder="you@example.com"
              disabled={navigation.state !== "idle" ? true : false}
              required
              minLength={3}
              autoComplete="no"
            />
            {errors?.email && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" /></div>}
          </div>
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors?.email && <span>{errors.email}</span>}
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {navigation.state === "idle" && 'Save'}
          {navigation.state === "submitting" && 'Saving...'}
          {navigation.state === "loading" && "Saved!"}
        </button>
      </Form>
    </>
  )
}