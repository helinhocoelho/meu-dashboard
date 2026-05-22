//supabaseKey: sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";
const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

const supabase = createClient(supabaseUrl, supabaseKey);

// ELEMENTOS
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

const authDiv = document.getElementById("auth");
const clientesDiv = document.getElementById("clientes");

console.log("JS carregado");

// ----------------------
// LOGIN
// ----------------------
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = senhaInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Erro login: " + error.message);
    return;
  }

  console.log("LOGADO:", data.user);

  await iniciarApp();
});

// ----------------------
// VERIFICA SESSÃO AO ABRIR
// ----------------------
document.addEventListener("DOMContentLoaded", iniciarApp);

// ----------------------
// INICIALIZAÇÃO CENTRAL
// ----------------------
async function iniciarApp() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    console.log("Sessão ativa:", data.session.user);

    authDiv.style.display = "none";

    await carregarClientes();
  } else {
    console.log("Sem sessão");

    authDiv.style.display = "block";
  }
}

// ----------------------
// CARREGAR CLIENTES (RLS CONTROLA TUDO)
// ----------------------
async function carregarClientes() {
  clientesDiv.innerHTML = "Carregando...";

  const { data, error } = await supabase.from("clientes").select("*");

  if (error) {
    console.log("Erro clientes:", error.message);
    return;
  }

  if (!data || data.length === 0) {
    clientesDiv.innerHTML = "<p>Nenhum dado encontrado.</p>";
    return;
  }

  clientesDiv.innerHTML = "";

  data.forEach((c) => {
    clientesDiv.innerHTML += `
  <div style="border:1px solid #ccc; margin:10px; padding:10px">
    <h3>${c.nome}</h3>
    <p>${c.email}</p>
    <p>${c.status}</p>
  </div>
`;
  });
}
