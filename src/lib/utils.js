import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setMinutes(
    nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
  );
  return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
    nuevaFecha
  );
};