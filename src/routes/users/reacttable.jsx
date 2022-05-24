import { Outlet, useLoaderData, Link, useNavigation } from "react-router-dom"
import { createTable, getCoreRowModel, userTableInstance, useTableInstance } from '@tanstack/react-table'

export async function loader() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon`)

  if(res.status === 404) {
    throw new Response("Not found", { status: 404})
  }

  return res.json()
}

export default function Pokemons() {
  const navigation = useNavigation();
  const pokemons = useLoaderData()

  const table = createTable()

  const columns = [
    table.createGroup({
      header: 'Name',
      footer: props => props.column.id,
      columns: [
        table.createDataColumn('name', {
          cell: info => info.getValue(),
          footer: props => props.column.id,
        }),
      ],
    }),
  ]


  const instance = useTableInstance(table, {
    data: pokemons.results,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <h1>List of Pokemon - {pokemons.count}</h1>

      {pokemons.results.map((pokemon) => {
        return <div key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link> {(navigation.state === "loading" && navigation.location.pathname === `/pokemon/${pokemon.name}`) && <span>(loading...)</span>}
        </div>
      })}

      {pokemons.results && <div className="p-2">
        <table>
          <thead>
            {instance.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {instance.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{cell.renderCell()}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
            {instance.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : header.renderFooter()}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot> */}
        </table>
      </div>
      }
      <Outlet />
    </>
    
  )
}