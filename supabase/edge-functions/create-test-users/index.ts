
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0'

// Environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

serve(async (req) => {
  try {
    // Create Super Admin user
    const { data: superAdmin, error: superAdminError } = await supabase.auth.admin.createUser({
      email: 'superadmin@test.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        role: 'super-admin'
      }
    })

    if (superAdminError) {
      throw superAdminError
    }

    // Create Clinic Admin user
    const { data: clinicAdmin, error: clinicAdminError } = await supabase.auth.admin.createUser({
      email: 'clinicadmin@test.com',
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        role: 'clinic-admin',
        clinic_name: 'Тестовая Клиника'
      }
    })

    if (clinicAdminError) {
      throw clinicAdminError
    }

    return new Response(
      JSON.stringify({ 
        message: 'Test users created successfully', 
        superAdmin: superAdmin.user.id,
        clinicAdmin: clinicAdmin.user.id
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
