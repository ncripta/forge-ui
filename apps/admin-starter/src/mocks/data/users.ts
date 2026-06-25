import type { UserRecord } from '@/services/user.service';

export const mockUsers: UserRecord[] = [
  { id: '1', name: 'Ana García', email: 'ana@ejemplo.com', role: 'SUPER_ADMIN', status: 'ACTIVE', createdAt: '2024-01-15' },
  { id: '2', name: 'Carlos Ruiz', email: 'carlos@ejemplo.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-02-10' },
  { id: '3', name: 'María López', email: 'maria@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-02-20' },
  { id: '4', name: 'Pedro Sánchez', email: 'pedro@ejemplo.com', role: 'USER', status: 'INACTIVE', createdAt: '2024-03-01' },
  { id: '5', name: 'Laura Martín', email: 'laura@ejemplo.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-03-15' },
  { id: '6', name: 'Diego Torres', email: 'diego@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-03-20' },
  { id: '7', name: 'Sofía Hernández', email: 'sofia@ejemplo.com', role: 'USER', status: 'INACTIVE', createdAt: '2024-04-01' },
  { id: '8', name: 'Andrés Morales', email: 'andres@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-04-10' },
  { id: '9', name: 'Valentina Rojas', email: 'valentina@ejemplo.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-04-15' },
  { id: '10', name: 'Mateo Castro', email: 'mateo@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-05-01' },
  { id: '11', name: 'Isabella Vargas', email: 'isabella@ejemplo.com', role: 'USER', status: 'INACTIVE', createdAt: '2024-05-10' },
  { id: '12', name: 'Sebastián Díaz', email: 'sebastian@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-05-20' },
  { id: '13', name: 'Camila Flores', email: 'camila@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-06-01' },
  { id: '14', name: 'Nicolás Mendoza', email: 'nicolas@ejemplo.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-06-10' },
  { id: '15', name: 'Luciana Ortiz', email: 'luciana@ejemplo.com', role: 'USER', status: 'INACTIVE', createdAt: '2024-06-15' },
  { id: '16', name: 'Emiliano Ramos', email: 'emiliano@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-07-01' },
  { id: '17', name: 'Renata Silva', email: 'renata@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-07-10' },
  { id: '18', name: 'Tomás Aguilar', email: 'tomas@ejemplo.com', role: 'USER', status: 'ACTIVE', createdAt: '2024-07-20' },
  { id: '19', name: 'Julieta Peña', email: 'julieta@ejemplo.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-08-01' },
  { id: '20', name: 'Benjamín Cruz', email: 'benjamin@ejemplo.com', role: 'USER', status: 'INACTIVE', createdAt: '2024-08-15' },
];
