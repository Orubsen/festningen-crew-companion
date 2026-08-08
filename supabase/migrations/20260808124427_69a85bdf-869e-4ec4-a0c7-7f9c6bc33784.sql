CREATE TABLE public.chat_meldinger (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  avsender TEXT NOT NULL CHECK (char_length(avsender) BETWEEN 1 AND 40),
  tekst TEXT NOT NULL CHECK (char_length(tekst) BETWEEN 1 AND 2000),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.chat_meldinger TO anon;
GRANT SELECT, INSERT ON public.chat_meldinger TO authenticated;
GRANT ALL ON public.chat_meldinger TO service_role;

ALTER TABLE public.chat_meldinger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Alle kan lese meldinger" ON public.chat_meldinger FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Alle kan skrive meldinger" ON public.chat_meldinger FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX chat_meldinger_created_at_idx ON public.chat_meldinger (created_at);

ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_meldinger;