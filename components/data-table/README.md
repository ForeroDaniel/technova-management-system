# Data Tables 📋

This is where we keep our table components. They help us show and manage data in a nice, organized way. We use [@tanstack/react-table](https://tanstack.com/table/v8) because it makes tables super easy to work with!

## What's Inside?

### Tabs (`tabs.tsx`)

Our main view switcher that:

- Shows different tables in tabs
- Switches between Activities, Projects, and Employees
- Keeps everything organized and easy to find

### Main Table (`table.tsx`)

Our basic table component that can:

- Sort columns (click on headers)
- Filter data (using the search box)
- Show data in pages
- Add new items with a button
- Show a message when there's no data

### Entity Table (`entity-table.tsx`)

A smart table that knows how to handle our different types of data:

- Activities
- Projects
- Employees

It takes care of all the setup for you!

### Column Files

These files tell the tables what to show:

- `activities-columns.tsx` - for activity data
- `projects-columns.tsx` - for project data
- `employees-columns.tsx` - for employee data
- `action-cell.tsx` - for edit/delete buttons

## How to Use

### Basic Table

```tsx
import { DataTable } from "@/components/data-table/table";

function YourComponent() {
  return (
    <DataTable columns={yourColumns} data={yourData} filterColumn="name" />
  );
}
```

### Ready-to-Use Table

```tsx
import EntityTable from "@/components/data-table/entity-table";

function ProjectsPage() {
  return <EntityTable entityType="projects" />;
}
```

## Nice Features

- Search through your data
- Sort by clicking column headers
- Works great on phones and computers
- Looks nice and clean
- Updates automatically when data changes

## Need Help?

- Check the code comments for details
- Look at [@tanstack/react-table docs](https://tanstack.com/table/v8/docs) for table features
- Check [shadcn/ui tabs](https://ui.shadcn.com/docs/components/tabs) for tab customization
