# Authentication Components 🔐

These are the authentication components that handle protected routes and user sessions in our application. We use [Supabase Auth](https://supabase.com/docs/guides/auth) for secure and reliable authentication!

## What's Inside?

### ProtectedPage (`protected-page.tsx`)

This is our main authentication wrapper that ensures routes are only accessible to authenticated users:

- Automatically checks user authentication status
- Redirects to login page if user is not authenticated
- Shows loading spinner during authentication check
- Renders children only when user is authenticated

### Logout (`logout.tsx`)

A simple but effective logout component that:

- Handles user sign-out securely
- Redirects to login page after successful logout
- Provides error handling for failed logout attempts

## How to Use

Need to protect a route? Easy:

```tsx
import { ProtectedPage } from "@/components/auth/protected-page";

function YourSecurePage() {
  return (
    <ProtectedPage>
      <YourComponent />
    </ProtectedPage>
  );
}
```

Want to add a logout button? Simple:

```tsx
import Logout from "@/components/auth/logout";

function YourComponent() {
  return <Logout />;
}
```

## Need Help?

- Check out [Supabase Auth docs](https://supabase.com/docs/guides/auth) for authentication details
- Look at the code comments for implementation details
