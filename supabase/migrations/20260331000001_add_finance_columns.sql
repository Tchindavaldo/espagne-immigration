ALTER TABLE tolito_espagne_immigration_evaluations 
ADD COLUMN IF NOT EXISTS paid_amount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_plan jsonb DEFAULT '[]'::jsonb;
