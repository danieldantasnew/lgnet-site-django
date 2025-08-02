document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.querySelector('#id_tem_segundo_turno');
    const inicio = document.querySelector('#id_segundo_horario_inicio');
    const fim = document.querySelector('#id_segundo_horario_fim');

    if (!checkbox || !inicio || !fim) return;

    const inicioRow = inicio.closest('.form-row') || inicio.closest('.form-group') || inicio.parentElement.parentElement;
    const fimRow = fim.closest('.form-row') || fim.closest('.form-group') || fim.parentElement.parentElement;

    function toggleTurno() {
        const mostrar = checkbox.checked;
        inicioRow.style.display = mostrar ? '' : 'none';
        fimRow.style.display = mostrar ? '' : 'none';
    }

    toggleTurno();
    checkbox.addEventListener('change', toggleTurno);
});
