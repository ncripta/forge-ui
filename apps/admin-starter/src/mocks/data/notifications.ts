import type { NotificationRecord } from '@/services/notification.service';

export const mockNotifications: NotificationRecord[] = [
  {
    id: '1',
    title: 'Nuevo usuario registrado',
    message: 'David López se registró en la plataforma.',
    type: 'info',
    read: false,
    createdAt: 'Hace 5 min',
  },
  {
    id: '2',
    title: 'Despliegue completado',
    message: 'El proyecto "E-commerce Portal" se desplegó exitosamente en producción.',
    type: 'success',
    read: false,
    createdAt: 'Hace 20 min',
  },
  {
    id: '3',
    title: 'Límite de almacenamiento',
    message: 'El workspace está al 85% de capacidad. Considera ampliar el plan.',
    type: 'warning',
    read: false,
    createdAt: 'Hace 1 hora',
  },
  {
    id: '4',
    title: 'Error en agente IA',
    message: 'El agente "Soporte-v2" falló 3 veces consecutivas en las últimas 2 horas.',
    type: 'error',
    read: false,
    createdAt: 'Hace 2 horas',
  },
  {
    id: '5',
    title: 'Actualización disponible',
    message: 'Forge UI v0.2.0 está disponible con mejoras de rendimiento.',
    type: 'info',
    read: true,
    createdAt: 'Hace 1 día',
  },
  {
    id: '6',
    title: 'Factura procesada',
    message: 'El cobro mensual de $45.00 fue procesado correctamente.',
    type: 'success',
    read: true,
    createdAt: 'Hace 2 días',
  },
];
