# TechNova Management System 🚀

A modern, full-stack web application for managing projects, activities, and employees. Built with Next.js, Supabase, and a beautiful UI powered by shadcn/ui.

## Features ✨

### Dashboard & Analytics

- Interactive charts showing project costs and profitability
- Employee workload visualization
- Project hours tracking
- Real-time data updates

### Project Management

- Create and manage projects
- Track project budgets and timelines
- Monitor project profitability
- View project-specific activities

### Activity Tracking

- Log work activities
- Associate activities with projects and employees
- Track time spent on tasks
- Categorize activities by type

### Employee Management

- Manage employee profiles
- Track employee workload
- Monitor employee project assignments
- Calculate costs based on hourly rates

## Tech Stack 🛠️

- **Frontend**: Next.js 15.1, React 19
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **State Management**: SWR
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table v8

## Getting Started 🚀

1. **Clone the repository**

```bash
git clone https://github.com/your-username/technova-management-system.git
cd technova-management-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Supabase Setup 🗄️

1. **Create a Supabase Project**

   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Save your project URL and anon key for the `.env.local` file

2. **Create Database Tables**
   - Navigate to the SQL editor in your Supabase dashboard
   - Run the following SQL commands to create the required tables:

```sql
-- Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    correo_electronico TEXT NOT NULL,
    equipo TEXT,
    costo_por_hora NUMERIC
);

-- Create the project table
CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    presupuesto NUMERIC,
    compania TEXT,
    fecha_inicio DATE,
    fecha_fin DATE
);

-- Create the activity table
CREATE TABLE activity (
    id SERIAL PRIMARY KEY,
    descripcion TEXT NOT NULL,
    tipo TEXT NOT NULL,
    minutos INT NOT NULL,
    empleado_id INT NOT NULL,
    proyecto_id INT NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT fk_empleado FOREIGN KEY (empleado_id) REFERENCES employee(id),
    CONSTRAINT fk_proyecto FOREIGN KEY (proyecto_id) REFERENCES project(id)
);
```

3. **Enable Row Level Security (Optional)**

   - Go to Authentication > Policies
   - Enable RLS for each table
   - Create appropriate policies for your security requirements

4. **Set up Authentication**

   - Go to Authentication > Settings
   - Configure your auth providers (Email, etc.)
   - Set up email templates if using email authentication.

5. **Test Database Connection**
   - Ensure your `.env.local` file has the correct credentials
   - Run the development server
   - Try creating a test record to verify the connection

## Project Structure 📁

### Components

- **`/components/charts`**: Data visualization components
- **`/components/data-table`**: Table components for data management
- **`/components/dialog`**: Modal dialogs for CRUD operations
- **`/components/layout`**: Core layout components
- **`/components/auth`**: Authentication components

### API Routes

- **`/api/activities`**: Activity management endpoints
- **`/api/projects`**: Project management endpoints
- **`/api/employees`**: Employee management endpoints

### Hooks

- **`useAppDataSWR`**: Central data fetching hook
- **`useFormValidation`**: Form validation hooks
- **`useToast`**: Toast notification hook

## Key Features in Detail 🔍

### Data Tables

- Sortable columns
- Text filtering
- Pagination
- Inline editing
- Responsive design

### Charts

- Project cost analysis
- Profitability comparison
- Hours distribution
- Employee workload

### Forms

- Field validation
- Error handling
- Dynamic select options
- Real-time updates

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Recharts](https://recharts.org/) for the chart components
- [TanStack Table](https://tanstack.com/table/v8) for the powerful table features
