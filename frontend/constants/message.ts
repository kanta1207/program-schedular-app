export const TOAST = {
  success: {
    created: 'Item created!',
    updated: 'Item updated!',
    deleted: 'Item deleted!',
  },
  error: {
    screenshot: 'Failed to take screenshot',
  },
  info: {
    ganttInstructorClicked: 'Only class item can be edited',
  },
} as const;

export const CONFIRM = {
  delete: 'Are you sure you want to delete this item?\nThis action cannot be undone.',
  cancel: 'Are you sure you want to cancel?',
  closeEditor: 'Are you sure you want to close without saving your edits to the schedule?',
} as const;
