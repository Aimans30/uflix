'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllUsers, updateUserRole } from '@/services/adminService';
import { getCurrentUser } from '@/services/authService';

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData.data?.role !== 'admin') {
        router.push('/');
        return;
      }
      setAuthorized(true);
      fetchUsers();
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/sign-in');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId: string, newRole: string, userName: string) => {
    if (!confirm(`Change ${userName}'s role to ${newRole}?`)) return;

    try {
      await updateUserRole(userId, newRole);
      alert('User role updated successfully!');
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update user role');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-neutral-dark mt-2">Manage user accounts and roles</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-border p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone || 'N/A'}</div>
                      <div className="text-sm text-gray-500">
                        {user.addresses?.length || 0} addresses
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user._id, e.target.value, user.name)}
                        className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-dark">No users found</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="text-sm text-neutral-dark mb-1">Total Users</div>
            <div className="text-2xl font-bold">{users.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="text-sm text-neutral-dark mb-1">Admins</div>
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="text-sm text-neutral-dark mb-1">Regular Users</div>
            <div className="text-2xl font-bold">{users.filter(u => u.role === 'user').length}</div>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/admin" className="text-accent hover:text-secondary">
            ← Back to Dashboard
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
