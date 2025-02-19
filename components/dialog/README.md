# Dialogs 💬

These are our popup dialog components. They help us create, edit, and delete stuff in a nice way. We use [shadcn/ui](https://ui.shadcn.com/) to make them look good!

## What's Inside?

### Base Dialog (`base-dialog.tsx`)

This is our main dialog that handles:

- Forms that create or edit things
- Making sure data is valid
- Showing success or error messages
- Looking good on all screens

### Special Dialogs

1. **Create Dialog** (`create-dialog.tsx`)

   - Opens when you click "Create New"
   - Shows a clean form
   - Tells you if something's wrong
   - Clears the form after saving

2. **Edit Dialog** (`edit-dialog.tsx`)

   - Opens when you click "Edit"
   - Shows current data in the form
   - Updates things when you save
   - Keeps everything in sync

3. **Delete Dialog** (`delete-dialog.tsx`)
   - Asks "Are you sure?"
   - Safely deletes things
   - Shows a success message
   - Updates the list automatically

## Nice Features

- Looks nice and consistent
- Smooth animations
- Works on all devices
- Works with keyboard too
- Shows helpful messages

## Need Help?

- Look at the code comments
- Check [shadcn/ui docs](https://ui.shadcn.com/) for styling
