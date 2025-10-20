'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ItemForm({ action, defaultValues = {} }) {
  return (
    <form
      action={action}
      className="space-y-2 p-4 border rounded-md"
    >
      <div className="flex gap-2">
        <Input
          name="title"
          placeholder="Title"
          defaultValue={defaultValues.title || ''}
          required
        />
        <Input
          name="description"
          placeholder="Description"
          defaultValue={defaultValues.description || ''}
          required
        />
        <Input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          defaultValue={defaultValues.price || ''}
          required
        />
        <Button type="submit">
          {defaultValues.id ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  )
}
