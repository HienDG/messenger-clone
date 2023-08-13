import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merge Tailwind CSS classes without style conflicts.
const merge = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs));
};

export default merge;
