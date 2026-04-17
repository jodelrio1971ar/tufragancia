// ========================================
// CONFIGURACIÓN SUPABASE
// ========================================
// 1. Regístrate en https://supabase.com
// 2. Crea un nuevo proyecto
// 3. Reemplaza ESTAS VARIABLES con tus credenciales:

const SUPABASE_URL = 'https://tqwrbczkzcxzfwrexjre.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxd3JiY3premN4emZ3cmV4anJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMjg5MjcsImV4cCI6MjA5MDgwNDkyN30.CAJYgG-zdAeY6jo9bCqPVRmz2R0ktIKGK2-VsGcgT3I';

// ========================================
// FUNCIÓN PARA INICIALIZAR SUPABASE
// ========================================
async function initSupabase() {
  // Importar la librería de Supabase (agregada en el HTML)
  const { createClient } = window.supabase;
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabase;
}

// ========================================
// FUNCIÓN PARA GUARDAR RESPUESTAS DEL QUIZ
// ========================================
async function saveQuizResponse(userName, userEmail, userPhone, quizAnswers, recommendedFragrance) {
  try {
    const supabase = await initSupabase();

    // Agregar el nombre al objeto de respuestas
    const answersWithNombre = { ...quizAnswers, nombre: userName };

    const { data, error } = await supabase
      .from('quiz_responses')
      .insert([
        {
          email: userEmail,
          phone: userPhone,
          answers: answersWithNombre, // JSON con las respuestas + nombre
          recommended_fragrance: recommendedFragrance,
          created_at: new Date().toISOString(),
          ip_address: await getUserIP()
        }
      ]);
    
    if (error) throw error;
    
    console.log('✅ Respuesta guardada exitosamente:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error al guardar:', error.message);
    return { success: false, error: error.message };
  }
}

// ========================================
// FUNCIÓN PARA OBTENER IP DEL USUARIO
// ========================================
async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'unknown';
  }
}

// ========================================
// FUNCIÓN PARA OBTENER ESTADÍSTICAS
// (Admin panel)
// ========================================
async function getQuizStats() {
  try {
    const supabase = await initSupabase();
    
    const { data, error } = await supabase
      .from('quiz_responses')
      .select('recommended_fragrance, count(*)')
      .groupBy('recommended_fragrance');
    
    if (error) throw error;
    
    console.log('📊 Estadísticas de recomendaciones:', data);
    return data;
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error.message);
    return null;
  }
}

// Exportar si es necesario (para módulos)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initSupabase, saveQuizResponse, getQuizStats, getUserIP };
}
