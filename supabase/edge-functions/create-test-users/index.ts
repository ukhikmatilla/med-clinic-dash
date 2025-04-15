
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
}

// Environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

// Initialize Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { headers: corsHeaders, status: 405 }
    )
  }

  try {
    console.log('Creating test users...')

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
      console.error('Error creating super admin:', superAdminError)
      throw superAdminError
    }

    console.log('Created super admin user:', superAdmin.user.id)

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
      console.error('Error creating clinic admin:', clinicAdminError)
      throw clinicAdminError
    }

    console.log('Created clinic admin user:', clinicAdmin.user.id)

    return new Response(
      JSON.stringify({ 
        message: 'Test users created successfully', 
        superAdmin: superAdmin.user.id,
        clinicAdmin: clinicAdmin.user.id,
        loginCredentials: {
          superAdmin: {
            email: 'superadmin@test.com',
            password: 'password123'
          },
          clinicAdmin: {
            email: 'clinicadmin@test.com',
            password: 'password123'
          }
        }
      }),
      { headers: corsHeaders, status: 200 }
    )
  } catch (error) {
    console.error('Error creating test users:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: corsHeaders, status: 400 }
    )
  }
})
