DROP POLICY "Public reads published settings" ON public.site_settings;
CREATE POLICY "Visitors read published settings" ON public.site_settings FOR SELECT TO anon USING (published);
CREATE POLICY "Signed-in read settings" ON public.site_settings FOR SELECT TO authenticated USING (published OR public.has_role(auth.uid(), 'admin'));