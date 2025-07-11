import { createClient } from '@supabase/supabase-js';

// Prendi variabili d'ambiente da Vercel
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

// Log di controllo per debugging su Vercel
if (!url || !key) {
  console.error('❌ Variabili SUPABASE_URL o SUPABASE_KEY mancanti!');
}

const supabase = createClient(url, key);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('predict_texts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('❌ Errore Supabase:', error);
      return res.status(500).json({ error: error.message || 'Errore Supabase' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Errore generico nella fetch:', err);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}
