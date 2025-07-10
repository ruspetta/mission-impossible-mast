// api/predict-texts.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('predict_text')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Errore durante il recupero dati.' });
  }

  res.status(200).json(data);
}
