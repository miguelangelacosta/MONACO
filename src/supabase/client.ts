import { createClient } from '@supabase/supabase-js';

// Tomamos las variables de entorno de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificación para evitar errores en tiempo de ejecución
if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Supabase URL y Anon Key son requeridos. Revisa tu archivo .env');
}

// Creamos el cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
