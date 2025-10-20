'use server'
import { revalidatePath } from 'next/cache'
import { supabaseServer } from '@/lib/supabaseServer'

const PAGE_SIZE = 5

export async function getItems({ page = 1, search = '' }) {
  const supabase = supabaseServer()
  let query = supabase
    .from('items')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, count, error } = await query.range(from, to)
  if (error) throw error

  return { data, count, page, totalPages: Math.ceil(count / PAGE_SIZE) }
}

export async function createItem(formData) {
  const supabase = supabaseServer()
  const { title, description, price } = Object.fromEntries(formData)
  await supabase.from('items').insert({ title, description, price: Number(price) })
  revalidatePath('/')
}

export async function updateItem(id, formData) {
  const supabase = supabaseServer()
  const { title, description, price } = Object.fromEntries(formData)
  await supabase.from('items').update({ title, description, price: Number(price) }).eq('id', id)
  revalidatePath('/')
}

export async function deleteItem(id) {
  const supabase = supabaseServer()
  await supabase.from('items').delete().eq('id', id)
  revalidatePath('/')
}
