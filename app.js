//supabaseKey: sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://ubhbapccfqvcetfazxjw.supabase.co";

const supabaseKey = "sb_publishable_wFCLK5zs-_TqRFcbuwGBhg_gs_LiZHm";

const supabase = createClient(supabaseUrl, supabaseKey);

async function carregarClientes() {
  const { data, error } = await supabase.from("clientes").select("*");

  console.log(data);

  if (error) {
    console.log(error);
    return;
  }

  const container = document.getElementById("clientes");

  data.forEach((cliente) => {
    container.innerHTML += `
      <div class="card">

        <h2>${cliente.nome}</h2>

        <p>
          <strong>Projeto:</strong>
          ${cliente.projeto}
        </p>

        <p>
          <strong>Status:</strong>
          ${cliente.status}
        </p>

      </div>
    `;
  });
}

carregarClientes();
