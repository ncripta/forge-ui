import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService, type UserRecord, type UserFilters } from '@/services/user.service';
import {
  Button, Input, Badge, Avatar,
  DataTable, type ColumnDef,
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Label, toast,
} from '@forge-ui/react';

const columns: ColumnDef<UserRecord, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Usuario',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar size="sm" fallback={row.original.name.charAt(0)} />
        <div>
          <p className="font-medium text-text-main">{row.original.name}</p>
          <p className="text-xs text-text-muted">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => <Badge intent="primary" variant="subtle">{row.original.role}</Badge>,
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <Badge intent={row.original.status === 'ACTIVE' ? 'success' : 'default'}>
        {row.original.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
      </Badge>
    ),
  },
  { accessorKey: 'createdAt', header: 'Creado' },
];

export function UsersPage() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<UserFilters>({ page: 1 });
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState<UserRecord | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => UserService.getAll(filters),
  });

  const deleteMutation = useMutation({
    mutationFn: UserService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Usuario eliminado correctamente');
    },
  });

  const handleSearch = () => {
    setFilters((f) => ({ ...f, page: 1, search }));
  };

  const handleEdit = (user: UserRecord) => {
    setEditUser(user);
    setSheetOpen(true);
  };

  // Add actions column
  const columnsWithActions: ColumnDef<UserRecord, unknown>[] = [
    ...columns,
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="ghost" size="icon">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger-main" onClick={() => deleteMutation.mutate(row.original.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-main">Usuarios</h1>
          <p className="text-text-muted mt-1">{data?.total || 0} usuarios registrados</p>
        </div>
        <Button onClick={() => { setEditUser(null); setSheetOpen(true); }}>+ Nuevo usuario</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Input placeholder="Buscar por nombre o email..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
          <Button intent="secondary" onClick={handleSearch}>Buscar</Button>
        </div>
        <Select value={filters.role || ''} onValueChange={(v) => setFilters((f) => ({ ...f, page: 1, role: v || undefined }))}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Rol" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.status || ''} onValueChange={(v) => setFilters((f) => ({ ...f, page: 1, status: v || undefined }))}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Estado" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Activo</SelectItem>
            <SelectItem value="INACTIVE">Inactivo</SelectItem>
          </SelectContent>
        </Select>
        {(filters.search || filters.role || filters.status) && (
          <Button
            intent="ghost"
            onClick={() => { setSearch(''); setFilters({ page: 1 }); }}
            className="text-text-muted"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-text-muted">Cargando...</div>
      ) : (
        <DataTable columns={columnsWithActions} data={data?.data || []} enableSelection />
      )}

      {/* Edit Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editUser ? 'Editar usuario' : 'Nuevo usuario'}</SheetTitle>
            <SheetDescription>
              {editUser ? 'Modifica los datos del usuario.' : 'Completa los campos para crear un usuario.'}
            </SheetDescription>
          </SheetHeader>
          <UserForm user={editUser} onClose={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

// --- User Form inside Sheet ---
function UserForm({ user, onClose }: { user: UserRecord | null; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      role: (form.get('role') as UserRecord['role']) || 'USER',
      status: (form.get('status') as UserRecord['status']) || 'ACTIVE',
    };

    if (user) {
      await UserService.update(user.id, payload);
      toast.success('Usuario actualizado');
    } else {
      await UserService.create(payload);
      toast.success('Usuario creado');
    }

    setLoading(false);
    queryClient.invalidateQueries({ queryKey: ['users'] });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" defaultValue={user?.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={user?.email} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <select name="role" defaultValue={user?.role || 'USER'} className="flex h-10 w-full rounded-md border border-surface-border bg-surface-background px-3 py-2 text-sm">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" loading={loading} className="flex-1">{user ? 'Guardar' : 'Crear'}</Button>
        <Button type="button" intent="secondary" onClick={onClose}>Cancelar</Button>
      </div>
    </form>
  );
}
