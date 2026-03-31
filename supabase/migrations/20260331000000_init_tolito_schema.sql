/*
  # TOLITO Database Schema
  
  1. New Tables
    - `tolito_espagne_immigration_evaluations`: Stores user immigration evaluations
    - `tolito_espagne_immigration_whatsapp_config`: Stores WhatsApp contact information for payments
    - `tolito_espagne_immigration_site_settings`: General site configurations
    
  2. Security
    - Enable RLS on all tables
    - Public can insert evaluations
    - Admins (authenticated) can view and manage all data
*/

-- 1. Evaluations Table
CREATE TABLE IF NOT EXISTS tolito_espagne_immigration_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  nationality text,
  residence_country text,
  age integer,
  service_type text NOT NULL,
  situation text,
  has_criminal_record text DEFAULT 'non',
  financial_status text,
  employment_status text,
  degree_level text,
  invest_amount text,
  message text,
  checked_documents text[], -- Array of documents they confirmed having
  status text DEFAULT 'pending', -- pending, reviewing, accepted, rejected, paid
  tracking_number text UNIQUE, -- JM-XX-XXXXXX style
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. WhatsApp & Payment Config Table
CREATE TABLE IF NOT EXISTS tolito_espagne_immigration_whatsapp_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text NOT NULL, -- The number that will be shown for payment
  message_template_study text, -- Template for "frais d'étude de dossier"
  message_template_processing text, -- Template for "frais de traitement"
  active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- 3. Site Settings
CREATE TABLE IF NOT EXISTS tolito_espagne_immigration_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_email text,
  site_phone text,
  site_address text,
  company_name text DEFAULT 'TOLITO IMMIGRATION',
  updated_at timestamptz DEFAULT now()
);

-- Security Configuration
ALTER TABLE tolito_espagne_immigration_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tolito_espagne_immigration_whatsapp_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE tolito_espagne_immigration_site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for Evaluations
CREATE POLICY "Public can insert evaluations" ON tolito_espagne_immigration_evaluations FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated admins can view evaluations" ON tolito_espagne_immigration_evaluations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated admins can update evaluations" ON tolito_espagne_immigration_evaluations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated admins can delete evaluations" ON tolito_espagne_immigration_evaluations FOR DELETE TO authenticated USING (true);

-- Policies for WhatsApp Config
CREATE POLICY "Public can view active whatsapp config" ON tolito_espagne_immigration_whatsapp_config FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage whatsapp config" ON tolito_espagne_immigration_whatsapp_config FOR ALL TO authenticated USING (true);

-- Policies for Site Settings
CREATE POLICY "Public can view site settings" ON tolito_espagne_immigration_site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" ON tolito_espagne_immigration_site_settings FOR ALL TO authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tolito_espagne_eval_email ON tolito_espagne_immigration_evaluations(email);
CREATE INDEX IF NOT EXISTS idx_tolito_espagne_eval_tracking ON tolito_espagne_immigration_evaluations(tracking_number);
