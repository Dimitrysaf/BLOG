import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

// CORS headers for handling preflight requests and allowing requests from any origin.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle preflight OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Create a Supabase client with the user's authorization token.
    // This client can only act on behalf of the user.
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    // 2. Get the user's data to retrieve their email.
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("User not found.");
    
    // 3. Get the password from the request body.
    const { password } = await req.json();
    if (!password) throw new Error("Password is required.");

    // 4. Verify the password by attempting to sign in again.
    // This is the secure way to check if the password is correct without storing it.
    const { error: signInError } = await userClient.auth.signInWithPassword({
      email: user.email,
      password: password,
    });

    if (signInError) {
      // If sign-in fails, the password was incorrect.
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 5. If password is correct, create a Supabase client with Admin privileges.
    // This client is required to delete a user.
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "" // This key MUST be kept secret.
    );

    // 6. Delete the user using their ID.
    // The `on delete cascade` in your database schema will handle deleting the profile.
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id);
    if (deleteError) throw deleteError;

    // 7. Return a success response.
    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    // Handle any other errors.
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
