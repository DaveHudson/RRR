import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function PokemonErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {

    if (error.status === 404) {
      return (
        <div className="mt-8">
          <h2 className="text-3xl leading-6 font-medium text-gray-900">{error.status}</h2>
          <pre className="pt-2">{error.data}</pre>
          <p className="pt-2">This page doesn't exist!</p>          
        </div>
      )
    }

    if (error.status === 401) {
      return  <div className="mt-8">You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return  <div className="mt-8">Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return  <div className="mt-8">🫖</div>;
    }


  }

  return  <div className="mt-8">There was a problem</div>;
}