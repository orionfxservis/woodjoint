// Supabase Configuration for WOODJOINT
// Replace 'sb_publishable_rnxMaJuE7KAjchYt3VN53Q_lYuJQpW7' with your actual Supabase Anon/Public API Key
const SUPABASE_URL = "https://aywuxnimzuqmocjccvbv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rnxMaJuE7KAjchYt3VN53Q_lYuJQpW7";

let supabaseClient = null;

// Initialize Supabase Client
function getSupabaseClient() {
    if (!supabaseClient) {
        if (typeof supabase === 'undefined') {
            console.error("Supabase CDN library not loaded. Please ensure the CDN script is included in your HTML.");
            return null;
        }
        if (SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY" || !SUPABASE_ANON_KEY) {
            console.warn("Please replace 'YOUR_SUPABASE_ANON_KEY' with your real Supabase Anon API key in assets/js/supabase.js");
            return null;
        }
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } catch (e) {
            console.error("Error creating Supabase client:", e);
            supabaseClient = null;
        }
    }
    return supabaseClient;
}

// Save a query to the database
async function saveQueryToSupabase(queryData) {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
        const { data, error } = await client
            .from('woodjoint_queries')
            .insert([{
                query_id: queryData.id,
                type: queryData.type,
                date_submitted: queryData.date,
                name: queryData.name,
                phone: queryData.phone,
                email: queryData.email,
                prop_type: queryData.propType,
                emirate: queryData.emirate,
                area: queryData.area,
                services: queryData.services,
                budget: queryData.budget,
                timeline: queryData.timeline,
                description: queryData.description,
                visit_date_time: queryData.visit,
                status: queryData.status || 'Pending'
            }]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Failed to insert query to Supabase:", err);
        return false;
    }
}

// Fetch all queries from Supabase
async function fetchQueriesFromSupabase() {
    const client = getSupabaseClient();
    if (!client) return [];

    try {
        const { data, error } = await client
            .from('woodjoint_queries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase Select Error:", error);
            return [];
        }

        // Map database fields to the dashboard UI model
        return data.map(q => ({
            id: q.query_id,
            db_id: q.id, // Supabase internal uuid
            type: q.type,
            date: q.date_submitted,
            name: q.name,
            phone: q.phone,
            email: q.email,
            propType: q.prop_type,
            emirate: q.emirate,
            area: q.area,
            services: q.services,
            budget: q.budget,
            timeline: q.timeline,
            description: q.description,
            visit: q.visit_date_time,
            status: q.status
        }));
    } catch (err) {
        console.error("Failed to fetch queries from Supabase:", err);
        return [];
    }
}

// Update query status in Supabase
async function updateQueryStatusInSupabase(queryId, status) {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
        const { data, error } = await client
            .from('woodjoint_queries')
            .update({ status: status })
            .eq('query_id', queryId);

        if (error) {
            console.error("Supabase Update Error:", error);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Failed to update status in Supabase:", err);
        return false;
    }
}

// Delete query from Supabase
async function deleteQueryFromSupabase(queryId) {
    const client = getSupabaseClient();
    if (!client) return false;

    try {
        const { data, error } = await client
            .from('woodjoint_queries')
            .delete()
            .eq('query_id', queryId);

        if (error) {
            console.error("Supabase Delete Error:", error);
            return false;
        }
        return true;
    } catch (err) {
        console.error("Failed to delete query from Supabase:", err);
        return false;
    }
}
