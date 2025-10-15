import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Δημιουργία client με τα credentials του χρήστη που καλεί τη function
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    // 2. Έλεγχος αν ο χρήστης που καλεί τη function είναι admin
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) throw new Error("User not authenticated.");

    const { data: profile, error: profileError } = await userClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'admin') {
      throw new Error("Permission denied: user is not an admin.");
    }

    // -- Μόνο αν ο έλεγχος είναι επιτυχής, συνεχίζουμε --

    // 3. Δημιουργία Admin Client με το SERVICE_ROLE_KEY
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 4. Λήψη του user_id που θέλουμε να διαγράψουμε από το request body
    const { userIdToDelete } = await req.json();
    if (!userIdToDelete) {
      throw new Error("User ID to delete is required.");
    }

    // 5. Διαγραφή του χρήστη
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(userIdToDelete);
    if (deleteError) {
      throw deleteError;
    }

    // 6. Επιστροφή απάντησης επιτυχίας
    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});