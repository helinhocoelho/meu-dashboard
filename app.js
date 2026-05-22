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

// DEBUG
console.log("JS carregado");

// ----------------------
// LOGIN
// ----------------------
loginBtn.addEventListener("click", async () => {
  console.log("Botão clicado");

  const email = emailInput.value;
  const password = senhaInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert("Erro login: " + error.message);
    return;
  }

  authDiv.style.display = "none";

  carregarClientes();
});

// ----------------------
// SESSÃO AUTOMÁTICA
// ----------------------
async function verificarSessao() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    console.log("Sessão ativa");

    authDiv.style.display = "none";

    carregarClientes();
  }
}

verificarSessao();

// ----------------------
// CARREGAR CLIENTES
// ----------------------
async function carregarClientes() {
  clientesDiv.innerHTML = "Carregando...";

  const { data, error } = await supabase.from("clientes").select("*");

  if (error) {
    console.log("Erro clientes:", error.message);
    return;
  }

  clientesDiv.innerHTML = "";

  data.forEach((c) => {
    clientesDiv.innerHTML += `
      <div style="border:1px solid #ccc; margin:10px; padding:10px">

        <h3>${c.nome}</h3>
        <p>${c.projeto}</p>
        <p>${c.status}</p>

      </div>
    `;
  });
}
