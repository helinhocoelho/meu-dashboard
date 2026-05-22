//supabaseKey: sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";
const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

const supabase = createClient(supabaseUrl, supabaseKey);

// LOGIN
async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Erro login:", error.message);
    return;
  }

  console.log("LOGADO:", data.user);

  carregarDados(); // chama seu dashboard
}

// exemplo de uso
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  login(email, senha);
});
