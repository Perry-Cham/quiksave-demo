"use client";

import AdminBreadcrumbs from "@/components/custom components/admin components/admin-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminDocsManageUsers() {
  return (
    <div className="h-full">
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Managing Users</h1>
          <p className="text-muted-foreground mb-8">
            A comprehensive guide to managing user accounts and access controls in QuikSave
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-base leading-relaxed text-foreground mb-4">
              The User Management system allows administrators to control who has access to the admin panel 
              and what permissions they have. You can view all users, modify their roles, and remove users 
              from the system when necessary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Roles</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold mb-2 text-blue-900">User</h3>
                <p className="text-blue-800">
                  Standard user role with limited access. Users can view products and place orders 
                  but cannot access the admin dashboard or manage system settings.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold mb-2 text-purple-900">Admin</h3>
                <p className="text-purple-800">
                  Full access to the admin dashboard. Admins can manage products, control user access, 
                  view documentation, and perform all administrative tasks.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accessing User Management</h2>
            <ol className="list-decimal list-inside space-y-3 text-foreground">
              <li>Log in to the admin panel with your admin account</li>
              <li>In the left sidebar, navigate to <strong>Access Controls</strong></li>
              <li>Click on <strong>Manage Users</strong></li>
              <li>You will see a table displaying all users in the system</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Management Features</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Viewing Users</h3>
                <p className="text-foreground mb-3">
                  The user management page displays a table with all current users. For each user, you can see:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground ml-2">
                  <li><strong>Name</strong> - The user's full name</li>
                  <li><strong>Email</strong> - The user's email address (used for login)</li>
                  <li><strong>Role</strong> - Current role (User or Admin)</li>
                  <li><strong>Joined</strong> - The date the user account was created</li>
                  <li><strong>Actions</strong> - Buttons to manage the user's role and account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Changing User Roles</h3>
                <ol className="list-decimal list-inside space-y-2 text-foreground">
                  <li>Find the user in the table whose role you want to change</li>
                  <li>If the user has the <strong>User</strong> role, click the <strong>"Make Admin"</strong> button</li>
                  <li>If the user has the <strong>Admin</strong> role, click the <strong>"Remove Admin"</strong> button to downgrade them to a regular user</li>
                  <li>The role change will take effect immediately</li>
                  <li>The user will have access to or lose access to the admin panel based on their new role</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Deleting Users</h3>
                <ol className="list-decimal list-inside space-y-2 text-foreground">
                  <li>Find the user in the table that you want to remove</li>
                  <li>Click the <strong>"Delete"</strong> button in the Actions column</li>
                  <li>A confirmation dialog will appear asking you to confirm the deletion</li>
                  <li>Click "Confirm" to permanently delete the user and all their associated data</li>
                  <li>The user will no longer be able to log in to the system</li>
                </ol>
                <p className="text-orange-600 mt-4 text-sm">
                  ⚠️ <strong>Warning:</strong> Deleting a user is permanent and cannot be undone. 
                  All user data and associated records will be removed. Use this action carefully.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <ul className="list-disc list-inside space-y-3 text-foreground">
              <li><strong>Review Regularly</strong> - Periodically review user list to ensure only authorized users have access</li>
              <li><strong>Limit Admin Access</strong> - Only grant admin privileges to trusted users who need them</li>
              <li><strong>Remove Inactive Users</strong> - Delete accounts for users who no longer need access</li>
              <li><strong>Monitor Role Changes</strong> - Keep track of who has admin privileges and why</li>
              <li><strong>Use Meaningful Names</strong> - Ensure users have clear, identifiable names for easy management</li>
              <li><strong>Backup Before Bulk Changes</strong> - Consider backing up user data before making significant changes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
            <p className="text-foreground mb-4">
              New users typically register themselves through the signup page. Once registered:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>They will have the <strong>User</strong> role by default</li>
              <li>They can be promoted to <strong>Admin</strong> status by an existing admin</li>
              <li>They will appear in the user management table</li>
              <li>Admins can adjust their permissions as needed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Users Not Loading</h3>
                <p className="text-foreground">
                  If the user list doesn't load, try refreshing the page. If the problem persists, 
                  check your internet connection and make sure you're logged in as an admin.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Role Change Not Working</h3>
                <p className="text-foreground">
                  If you can't change a user's role, make sure you have admin permissions yourself. 
                  Try refreshing the page and attempting again. If the issue continues, check system logs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can't Delete a User</h3>
                <p className="text-foreground">
                  Ensure you have admin permissions to delete users. Confirm that the user you're 
                  trying to delete is not actively performing tasks. Clear browser cache if issues persist.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">User Not in List</h3>
                <p className="text-foreground">
                  If a user appears to be missing, they may have been deleted by another admin. 
                  Ask them to re-register if they need to access the system again.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Security Considerations</h2>
            <ul className="list-disc list-inside space-y-3 text-foreground">
              <li>Only share admin credentials with trusted personnel</li>
              <li>Regularly audit user permissions and remove unnecessary admin accounts</li>
              <li>Keep track of who has admin access and why they need it</li>
              <li>Delete accounts for employees or users who no longer need system access</li>
              <li>Use strong, unique passwords for all accounts</li>
              <li>Change admin roles promptly when responsibilities change</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
