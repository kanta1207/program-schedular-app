export const TOAST = {
  success: {
    created: 'Item created!',
    updated: 'Item updated!',
    deleted: 'Item deleted!',
  },
  error: {
    screenshot: 'Failed to take screenshot',
  },
} as const;

export const CONFIRM = {
  delete: 'Are you sure you want to delete this item?\nThis action cannot be undone.',
  cancel: 'Are you sure you want to cancel?',
} as const;
