import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('predict_texts') // 👈 il nome corretto!
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('❌ Generic error:', err);
    res.status(500).json({ error: 'Errore interno' });
  }
}
