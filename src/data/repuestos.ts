export interface Repuesto {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

// Datos estáticos de repuestos para la aplicación Daytona Repuestos
export const REPUESTOS: Repuesto[] = [
  {
    id: "1",
    nombre: "Juego de Pastillas de Freno",
    categoria: "Frenos",
    descripcion: "Pastillas delanteras de cerámica de alto rendimiento con máxima duración.",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1588615419957-46294726d183?w=400&q=80",
  },
  {
    id: "2",
    nombre: "Kit de Filtros y Aceite 5W-30",
    categoria: "Mantenimiento",
    descripcion: "Filtro de aire, aceite, habitáculo y bidón de 4L de aceite sintético.",
    precio: 78000,
    imagen: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80",
  },
  {
    id: "3",
    nombre: "Amortiguador Delantero a Gas",
    categoria: "Suspensión",
    descripcion: "Amortiguador reforzado para óptima estabilidad y absorción de baches.",
    precio: 92000,
    imagen: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&q=80",
  },
  {
    id: "4",
    nombre: "Batería 12V 75Ah Reforzada",
    categoria: "Electricidad",
    descripcion: "Batería libre de mantenimiento con alto poder de arranque para frío extremo.",
    precio: 135000,
    imagen: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
  },
  {
    id: "5",
    nombre: "Kit de Distribución + Bomba de Agua",
    categoria: "Motor",
    descripcion: "Correa de distribución, tensor y bomba de agua con polea metálica.",
    precio: 120000,
    imagen: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&q=80",
  },
];
