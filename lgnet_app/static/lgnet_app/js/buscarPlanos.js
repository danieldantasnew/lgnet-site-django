import contratarPlano from "./contratarPlano.js";
import { notification } from "./notification.js";

export default function buscarPlanos(cidade) {
  const container = document.querySelector("[data-plans]");

  if(container) {
      fetch(`/api/planos/?cidade=${encodeURIComponent(cidade)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        container.innerHTML = `<p>${data.error}</p>`;
        return;
      }

      if (data.length === 0) {
        container.innerHTML = "<p>Nenhum plano disponível nesta cidade.</p>";
        return;
      }

      let html = "";

      data
        .sort((planoA, planoB) => planoA.ordem - planoB.ordem)
        .forEach((plano) => {
          html += `
              <div class="animate-fadeIn flex-[1_1_272px] mb-4 max-w-[292px] !bg-transparent transition-all">
                <div
                  class="
                    rounded-lg 
                    bg-light-background 
                    shadow-[0_0_2px_1px_rgba(0,0,0,.05)] 
                    overflow-hidden 
                    flex 
                    flex-col 
                    gap-4 
                    dark:bg-dark-variant 
                    dark:shadow-[0_0_1px_1.5px_rgb(255,255,255)]
                  "
                  data-plano-mensagem="${plano.mensagem}"
                  data-plano-contato="${plano.contato}"
                >
                  <div class="px-4 py-6">
                    <div
                      class="flex items-center justify-center h-9 w-9 p-1 rounded-full bg-neutral-100 *:text-primary-variant-2 *:text-xl dark:bg-dark-variant-2 dark:*:text-light-background"
                    >
                      ${plano.icone}
                    </div>
                    <h3
                      class="text-sm mt-3 font-semibold text-primary-variant-2 w-full dark:text-secondary text-left"
                    >
                      ${plano.categoria}
                    </h3>
                    <p
                      class="text-4xl mt-[1px] font-semibold tracking-tight text-primary-variant dark:text-light-background text-left"
                    >
                      ${plano.plano}
                    </p>
                    <p class="pb-2 text-neutral-400 text-xs text-left">100% Fibra óptica</p>
                    <div class="h-[2px] w-full bg-neutral-200 rounded-full"></div>
                    <ul
                      role="list"
                      class="mt-5 space-y-2 font-normal text-neutral-500 text-sm dark:text-light-background *:flex *:items-center *:gap-x-2"
                    >
                      ${plano.vantagens
                        .map((vantagem) => {
                          return `                      
                          <li>
                            <span
                              class="*:text-[17px] *:fill-neutral-500 **:fill-neutral-500 h-5 w-5 flex items-center justify-center *:h-full *:w-full dark:*:fill-[#ffffff] dark:**:fill-[#ffffff]"
                              >${vantagem.icone}</span
                            >
                            <p>${vantagem.nome}</p>
                          </li>`;
                        })
                        .join("")}
                    </ul>
                  </div>
                  <button
                    data-btn-contratar-plano
                    class="cursor-pointer bg-primary-variant hover:bg-primary-hover text-light-background text-center text-xl py-3 mt-6 font-semibold transition-colors dark:bg-secondary dark:text-dark-variant dark:hover:bg-secondary-hover"
                    >Assine já</button>
                </div>
              </div>
              `;
        });

      container.innerHTML = html;
      contratarPlano();
    })
    .catch((error) => {
      console.error(error);
      notification(`Erro ao carregar planos`, "error");
      container.innerHTML = "<p>Erro ao carregar planos.</p>";
    });
  }
}
