import { supabase } from './supabaseClient';

/**
 * Test Supabase connection and auth signup
 * Run this in browser console for debugging
 */
export const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...');

  try {
    // Test 1: Check auth status
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    console.log('✅ Session check:', sessionError ? `❌ ${sessionError.message}` : 'OK');

    // Test 2: Try a simple read (products table)
    const { data, error: readError } = await supabase.from('products').select('count');
    console.log('✅ Products read test:', readError ? `❌ ${readError.message}` : 'OK');

    console.log('🎉 Supabase connection OK');
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
};

/**
 * Test signup with debug logging
 */
export const testSignup = async (email, password, firstName, lastName, phone) => {
  console.log('📝 Testing signup with:', { email, firstName, lastName, phone });

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          phone,
        },
      },
    });

    if (error) {
      console.error('❌ Signup error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Signup success:', data.user?.id);
    return { success: true, user: data.user };
  } catch (err) {
    console.error('❌ Unexpected signup error:', err);
    return { success: false, error: err.message };
  }
};
