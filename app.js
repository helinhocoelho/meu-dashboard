// import { createClient } from "https://esm.sh/@supabase/supabase-js";

// const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";

// const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

// const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("Supabase conectado");

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";

const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

const supabase = createClient(supabaseUrl, supabaseKey);

async function carregarClientes() {
  const { data, error } = await supabase.from("clientes").select("*");

  console.log("DADOS:", data);

  console.log("ERRO:", error);
}

carregarClientes();
