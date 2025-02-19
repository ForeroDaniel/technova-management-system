# Charts 📊

These are the chart components used for data visualizations in our dashboard. We use [Recharts](https://recharts.org/) because it's easy to work with and looks great!

## What's Inside?

### ChartContainer (`chart-container.tsx`)

This is our main wrapper that organizes all charts in a nice grid. It adjusts automatically for phones and computers!

### Our Charts

1. **Total Cost Chart** (`card-1.tsx`)

   - Shows how much money each project costs
   - Uses employee rates and time spent

2. **Profitability Chart** (`card-2.tsx`)

   - Compares how profitable each project is
   - Easy to see how well are projects doing

3. **Hours Chart** (`card-3.tsx`)

   - Shows how many hours went into each project
   - Great for tracking time investment

4. **Workload Chart** (`card-4.tsx`)
   - Displays working hours by employee
   - Helps prevent overworking team members

## How to Use

Want to show all charts? Super easy:

```tsx
import ChartContainer from "@/components/charts/chart-container";

function YourComponent() {
  return <ChartContainer />;
}
```

Need just one chart? No problem:

```tsx
import Card1 from "@/components/charts/card-1";

function YourComponent() {
  return <Card1 />;
}
```

## Good to Know

- All charts update automatically when data changes
- They work on all screen sizes
- Uses the same styling as the rest of the app
- Shows helpful tooltips when you hover

## Need Help?

- Check out [Recharts docs](https://recharts.org/) for chart customization
- Look at the code comments for more details
