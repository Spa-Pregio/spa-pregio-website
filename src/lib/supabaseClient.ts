import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://reompjeeiurwnbpbfhyj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlb21wamVlaXVyd25icGJmaHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NjU1NTYsImV4cCI6MjA4ODM0MTU1Nn0.28-XskB1H0CvHzSUjikJy1UEzEuBiFXlkT0jbu2BIa4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
