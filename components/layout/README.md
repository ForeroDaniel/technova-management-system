# Layout Components 🎨

These are the core layout components that provide the structure and theming for our application. We use [next-themes](https://github.com/pacocoursey/next-themes) for seamless dark/light mode switching!

## What's Inside?

### Header (`header.tsx`)

Our main header component that displays:

- Application title with a beautiful gradient effect
- Subtitle with muted styling
- Theme-aware company logo
- Responsive design for all screen sizes

### Footer (`footer.tsx`)

A feature-rich footer that includes:

- Dark/light mode toggle switch
- Company logo
- Attribution and GitHub links
- Hydration-safe theme switching

### Theme Provider (`theme-provider.tsx`)

The core theme management wrapper that:

- Enables system-preferred theme detection
- Prevents theme switching flicker
- Provides theme context to all components
- Uses CSS classes for smooth transitions

### Theme-Aware Logo (`theme-aware-logo.tsx`)

A smart logo component that:

- Automatically switches between dark/light versions
- Prevents flash of wrong theme on load
- Accepts custom styling via className
- Maintains layout during loading

## How to Use

Need to wrap your app with theme support? Easy:

```tsx
import { ThemeProvider } from "@/components/layout/theme-provider";

function YourApp() {
  return (
    <ThemeProvider>
      <YourComponents />
    </ThemeProvider>
  );
}
```

Want to use the header and footer? Simple:

```tsx
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function YourLayout() {
  return (
    <>
      <Header />
      <main>{/* Your content */}</main>
      <Footer />
    </>
  );
}
```

Need a theme-aware logo? Here you go:

```tsx
import ThemeAwareLogo from "@/components/layout/theme-aware-logo";

function YourComponent() {
  return <ThemeAwareLogo className="w-24 h-24" />;
}
```

## Good to Know

- All components are client-side rendered (`"use client"`)
- Built with responsive design in mind
- Handles hydration safely
- Prevents theme flickering
- Uses Tailwind CSS for styling

## Need Help?

- Check out [next-themes docs](https://github.com/pacocoursey/next-themes) for theme customization
- Look at the code comments for implementation details
- Components use Tailwind CSS for styling - see [Tailwind docs](https://tailwindcss.com/docs)
