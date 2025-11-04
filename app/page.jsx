import { getItems, createItem, updateItem, deleteItem } from './actions/items'
import { supabaseServer } from '@/lib/supabaseServer'
import DataTable from '@/components/DataTable'
import ItemForm from '@/components/ItemForm'

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || '';

  const { data, totalPages } = await getItems({ page, search })

  return (
    <main className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-4">📦 Inventory CRUD (Server Actions)</h1>

      <ItemForm action={createItem} />

      {/* Server-side DataTable */}
      <DataTable
        data={data || []}
        totalPages={totalPages}
        page={page}
        search={search}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
    </main>
  )
}
