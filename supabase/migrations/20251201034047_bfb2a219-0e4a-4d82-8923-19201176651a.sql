-- Block all UPDATE operations on otp_codes - only service role should update
CREATE POLICY "Block all update on otp_codes"
ON public.otp_codes
FOR UPDATE
USING (false);

-- Block all DELETE operations on otp_codes - only service role should delete
CREATE POLICY "Block all delete on otp_codes"
ON public.otp_codes
FOR DELETE
USING (false);