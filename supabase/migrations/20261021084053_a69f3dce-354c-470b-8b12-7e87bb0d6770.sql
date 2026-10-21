CREATE POLICY "Public reads media" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'media');
DROP POLICY "Admins upload media" ON storage.objects;
CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin') AND lower(storage.extension(name)) IN ('jpg','jpeg','png','webp'));