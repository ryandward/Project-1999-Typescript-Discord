-- Migration: Add notes column to shared_accounts table
-- Date: 2025-11-22
-- Description: Adds a nullable text column 'notes' to store free-form notes for each shared account

-- Add the notes column
ALTER TABLE public.shared_accounts 
ADD COLUMN notes TEXT NULL;

-- Add a comment to document the column
COMMENT ON COLUMN public.shared_accounts.notes IS 'Free-form notes about the shared account, visible when using /login or /account commands';
