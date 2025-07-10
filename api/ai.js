// api/ai.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    return res.status(500).json({ error: 'Variabili Supabase non impostate' });
  }

  try {
    const { data, error } = await supabase
      .from('predict_texts')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Errore interno' });
  }
}
