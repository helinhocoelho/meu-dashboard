//supabaseKey: sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";
const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

const supabase = createClient(supabaseUrl, supabaseKey);

const authContainer = document.getElementById("auth");
const clientesContainer = document.getElementById("clientes");

const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const loginBtn = document.getElementById("loginBtn");

// ----------------------------
// LOGIN
// ----------------------------
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = senhaInput.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Erro no login: " + error.message);
    return;
  }

  console.log("Usuário logado:", data.user);

  // esconder login
  authContainer.style.display = "none";

  // carregar dados
  carregarClientes();
});

// ----------------------------
// VERIFICAR SESSÃO AO CARREGAR
// ----------------------------
async function verificarSessao() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    console.log("Sessão ativa:", data.session.user);

    authContainer.style.display = "none";
    carregarClientes();
  }
}

verificarSessao();

// ----------------------------
// CARREGAR CLIENTES (PROTEGIDO POR RLS)
// ----------------------------
async function carregarClientes() {
  clientesContainer.innerHTML = "Carregando...";

  const { data, error } = await supabase.from("clientes").select("*");

  if (error) {
    console.log("Erro ao buscar clientes:", error.message);
    return;
  }

  clientesContainer.innerHTML = "";

  data.forEach((cliente) => {
    clientesContainer.innerHTML += `
      <div class="card">

        <h2>${cliente.nome}</h2>

        <p><strong>Projeto:</strong> ${cliente.projeto}</p>

        <p><strong>Status:</strong> ${cliente.status}</p>

      </div>
    `;
  });
}
