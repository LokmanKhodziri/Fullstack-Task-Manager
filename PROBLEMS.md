# Project Problems and Solutions Documentation

## 1. Module Format Issues

### Problem

```
Specified module format (CommonJs) is not matching the module format of the source code (EcmaScript Modules)
```

### Solution

- Updated `package.json` to use ES modules by setting `"type": "module"`
- Ensured consistent use of ES module syntax (`import`/`export`) throughout the project

## 2. Prisma Client Initialization

### Problem

```
Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
```

### Solution

1. Installed Prisma client:

   ```bash
   npm install @prisma/client
   ```

2. Generated Prisma client:

   ```bash
   npx prisma generate
   ```

3. Updated import path in `app/utils/connect.ts`:

   ```typescript
   import { PrismaClient } from '../../generated/prisma';
   ```

## 3. Form Submission Issues

### Problem

- Form submission was failing with "Something gone wrong" error
- No proper error handling or validation

### Solution

1. Added client-side validation:

   ```typescript
   if (!title || !description || !date) {
     toast.error('Please fill in all required fields');
     return;
   }
   ```

2. Added title length validation:

   ```typescript
   if (title.length < 3) {
     toast.error('Title must be at least 3 characters long');
     return;
   }
   ```

3. Improved error handling in API calls:

   ```typescript
   catch (error: any) {
     console.error('Error details:', error.response?.data || error.message);
     toast.error(error.response?.data?.message || 'Something went wrong!');
   }
   ```

## 4. API Endpoint Issues

### Problem

- Incorrect API endpoint path causing 404 errors
- Missing authentication handling

### Solution

1. Updated API endpoint from `api/task/tasks` to `/api/tasks`
2. Added authentication checks in API route:

   ```typescript
   const { userId } = await auth();
   if (!userId) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
   ```

## 5. State Management Issues

### Problem

- Uncontrolled to controlled input warnings
- Undefined state values

### Solution

1. Initialized state with proper default values:

   ```typescript
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [date, setDate] = useState('');
   const [completed, setCompleted] = useState(false);
   const [important, setImportant] = useState(false);
   ```

## 6. TypeScript Type Issues

### Problem

- Missing type definitions
- Implicit any types

### Solution

1. Added proper type definitions for event handlers:

   ```typescript
   const handleChange = (name: string) => (e: any) => {
     // ... handler implementation
   };
   ```

2. Added type for form submission:

   ```typescript
   const handleSubmit = async (e: any) => {
     // ... submit implementation
   };
   ```

## 7. MongoDB Paused / userId Not Recognized

### Problem

- Tasks were not displaying in the app.
- The backend could not recognize or retrieve the `userId`.
- The root cause was that the MongoDB database was in a "paused" state (common with free-tier cloud MongoDB services like Atlas), so connections and queries failed.

### Solution

1. **Resume MongoDB Cluster:**
   - Logged into the MongoDB Atlas dashboard.
   - Located the paused cluster and clicked "Resume" to restart the database.
2. **Verify Database Connection:**
   - Ensured the backend could connect to MongoDB (no connection errors in logs).
   - Confirmed that the `userId` could be retrieved and used in queries.
3. **Check Application:**
   - Reloaded the app and verified that tasks were now displaying correctly for the authenticated user.

### Notes

- Free-tier MongoDB clusters may pause after periods of inactivity. Always check the cluster status if you encounter unexplained database or authentication issues.
- Consider upgrading or using a local MongoDB instance for development to avoid interruptions.

## 8. Sidebar Not Loading & NextRouter Not Mounted Error

### Problem

- The sidebar component was not rendering, and the following error appeared:

  ```
  Error: NextRouter was not mounted. https://nextjs.org/docs/messages/next-router-not-mounted
  ```

- The sidebar would only show a loading state and never render the actual content.

### Root Cause

- The `Sidebar` component was using a `mounted` flag from the global context to delay rendering until the client was ready.
- However, the `useRouter` and `usePathname` hooks from Next.js were being called before the component was mounted, which caused the "NextRouter was not mounted" error.
- Additionally, the context did not provide an `isThemeLoaded` flag, but the code was checking for it, causing the sidebar to never render.

### Solution

1. Updated the context to use the `mounted` flag and ensured it is set to `true` after the component mounts.
2. Moved the calls to `useRouter` and `usePathname` **after** the `mounted` check, so they are only called on the client.
3. Replaced any usage of `isThemeLoaded` with `mounted` in the Sidebar component.
4. Now, the sidebar renders correctly after the app is mounted, and the router hooks work without errors.

#### Code Example

```tsx
const { theme, mounted } = useGlobalState();
if (!mounted) return <div>Loading...</div>;

// Only call router hooks after mounted is true
const router = useRouter();
const pathname = usePathname();
```

## 9. DeleteTask Error Handling & Next.js 15 Async Params

### Problem

- The `deleteTask` function was showing generic "Something went wrong" error messages
- Users couldn't understand what specifically failed when deleting tasks
- The function was calling the wrong API endpoint (`/api/tasks/${id}` instead of `/api/${id}`)
- Next.js 15 introduced a new requirement where `params` must be awaited before accessing properties

### Root Cause

1. **Incorrect API Endpoint**: The delete function was calling `/api/tasks/${id}` but the actual DELETE endpoint is at `/api/[id]/route.ts`
2. **Poor Error Handling**: Generic error messages didn't provide actionable feedback
3. **Loading State Issues**: `setIsLoading(false)` wasn't called in error cases
4. **Next.js 15 Compatibility**: `params` object is now a Promise and must be awaited

### Solution

#### 1. Fixed API Endpoint URL

**Before:**

```javascript
const res = await axios.delete(`/api/tasks/${id}`);
```

**After:**

```javascript
const res = await axios.delete(`/api/${id}`);
```

#### 2. Improved Error Handling

**Before:**

```javascript
catch (error) {
    console.log(error);
    toast.error("Something went wrong");
}
```

**After:**

```javascript
catch (error) {
    console.error("Error deleting task:", error);

    // Provide more specific error messages
    if (error.response?.status === 401) {
        toast.error("Unauthorized. Please sign in again.");
    } else if (error.response?.status === 404) {
        toast.error("Task not found or already deleted.");
    } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
    } else {
        toast.error("Failed to delete task. Please try again.");
    }

    setIsLoading(false);
}
```

#### 3. Enhanced API Endpoint

**Before:**

```typescript
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Direct deletion without checking if task exists
}
```

**After:**

```typescript
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Next.js 15 async params requirement

  // Check if task exists before deleting
  const existingTask = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!existingTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  // Handle specific Prisma errors
  if (error.code === 'P2025') {
    return NextResponse.json(
      { error: 'Task not found or already deleted' },
      { status: 404 }
    );
  }
}
```

#### 4. Fixed Loading State Management

- Added `setIsLoading(false)` in the catch block to ensure loading state is properly reset
- Added early return with `setIsLoading(false)` when API returns an error

### Benefits

1. **Better User Experience**: Users get specific, actionable error messages
2. **Proper Error Recovery**: Loading state is properly reset even when errors occur
3. **Robust API**: Backend checks if tasks exist before attempting deletion
4. **Next.js 15 Compatibility**: Works with the latest Next.js async params requirement
5. **Better Debugging**: More detailed error logging for developers

### Notes

- Always check the actual API route structure when debugging endpoint issues
- Next.js 15 requires `params` to be awaited before accessing properties
- Consider implementing proper error boundaries for better error handling across the app

## 9. UI/UX Improvements: Responsive Layout, Consistent Cards, and Task Creation

### Problem

- The task grid and sidebar were not fully mobile responsive.
- The "Add New Task" button appeared both at the bottom and as a + icon at the top, causing redundancy.
- The "Add New Task" card did not match the size and style of other task cards, making the layout inconsistent.
- The hamburger menu and task grid layout needed refinement for better usability across devices.

### Solution

1. **Responsive Task Grid:**
   - Updated the grid to use `repeat(auto-fit, minmax(320px, 1fr))` for desktop, 2 columns for tablet, and 1 column for mobile.
   - Removed restrictive max-width on desktop to allow more columns.
2. **Consistent Card Sizing:**
   - Ensured the "Add New Task" card uses the same min-height and styling as other task cards.
   - Used `align-items: stretch` in the grid for uniform card heights.
3. **Task Creation Button:**
   - Removed the bottom "Add New Task" button for a cleaner UI.
   - Added a prominent + button at the top right of the "My Tasks" section for easy access.
4. **Hamburger Menu:**
   - Restored the floating hamburger button style for mobile, ensuring it does not interfere with the content.
5. **General UI Polish:**
   - Improved padding, spacing, and hover effects for a modern, unified look.
   - Ensured all layouts are visually consistent and user-friendly on desktop, tablet, and mobile.

### Result

- The app now provides a seamless, consistent experience across all devices.
- Task cards and the add card are visually aligned and uniform.
- Task creation is always accessible via the top + button.
- The UI is cleaner, more modern, and easier to use.

## Best Practices Implemented

1. **Error Handling**

   - Added proper error messages
   - Implemented toast notifications for user feedback
   - Added console logging for debugging

2. **Form Validation**

   - Added client-side validation
   - Implemented server-side validation
   - Added proper error messages for validation failures

3. **State Management**

   - Proper initialization of state values
   - Controlled form inputs
   - Proper type definitions

4. **API Integration**
   - Proper error handling for API calls
   - Authentication checks
   - Proper response handling

## Future Improvements

1. Add proper TypeScript types for all event handlers
2. Implement proper form validation library (e.g., Zod, Yup)
3. Add loading states for API calls
4. Implement proper error boundary
5. Add unit tests for components and API routes
6. Implement proper logging system
7. Add proper documentation for API endpoints
8. Implement proper caching strategy
9. Add proper security measures
10. Implement proper monitoring system

## Notes

- Always check the console for detailed error messages
- Use proper error handling in async operations
- Implement proper validation before API calls
- Use proper type definitions
- Follow best practices for state management
- Implement proper security measures
- Use proper logging for debugging
- Follow proper documentation practices
