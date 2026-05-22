//supabaseKey: sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";

const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

const supabase = createClient(supabaseUrl, supabaseKey);

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;

  const senha = document.getElementById("senha").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    alert("Erro login");

    console.log(error);

    return;
  }

  alert("Login realizado");

  carregarClientes();
});

async function carregarClientes() {
  const { data, error } = await supabase.from("clientes").select("*");

  console.log(data);

  const container = document.getElementById("clientes");

  container.innerHTML = "";

  data.forEach((cliente) => {
    container.innerHTML += `
      <div class="card">

        <h2>${cliente.nome}</h2>

        <p>
          Projeto:
          ${cliente.projeto}
        </p>

        <p>
          Status:
          ${cliente.status}
        </p>

      </div>
    `;
  });
}
