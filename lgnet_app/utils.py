import math
from datetime import datetime

def haversine(lat1, lon1, lat2, lon2):
    def to_radians(angle):
        return (angle * math.pi) / 180

    R = 6371  # Raio da Terra em km
    dLat = to_radians(lat2 - lat1)
    dLon = to_radians(lon2 - lon1)

    a = (
        math.sin(dLat / 2) ** 2 +
        math.cos(to_radians(lat1)) *
        math.cos(to_radians(lat2)) *
        math.sin(dLon / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

def encontrar_cidade_mais_proxima(cidades, latCliente, longCliente):
    cidade_mais_proxima = None
    menor_distancia = float("inf")

    for cidade in cidades:
        dist = haversine(
            latCliente,
            longCliente,
            float(cidade.latitude),
            float(cidade.longitude)
        )

        if dist < menor_distancia:
            menor_distancia = dist
            cidade_mais_proxima = cidade
    
    return cidade_mais_proxima

def proxima_dia_de_disponibilidade(horarios):
    dias_semana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
    hoje = datetime.now().weekday()
    for i in range(7):
        dia_verificacao = (hoje + i) % 7
        for horario in horarios:
            if(horario['dia_semana'] == dia_verificacao):
                horario_inicial = f"{horario['primeiro_horario_inicio'].hour}".zfill(2)

                if dia_verificacao == hoje + 1:
                    return (f"Aberto amanhã a partir das {horario_inicial}h")
                
                return (f"Aberto {dias_semana[dia_verificacao]} a partir das {horario_inicial}h")

    return "Sem horário disponível na semana."

def horarios_disponiveis_escritorio(horarios):
    hoje = datetime.now().weekday()
    horarios_normalizados = []
    horario_hoje_em_texto = ''
    
    for horario in horarios:
        primeiro_horario_inicio_hora = f"{horario['primeiro_horario_inicio'].hour}".zfill(2)
        primeiro_horario_inicio_minuto = f"{horario['primeiro_horario_inicio'].minute}".zfill(2)
        
        primeiro_horario_fim_hora = f"{horario['primeiro_horario_fim'].hour}".zfill(2)
        primeiro_horario_fim_minuto = f"{horario['primeiro_horario_fim'].minute}".zfill(2)


        if(horario['segundo_horario_inicio'] and horario['segundo_horario_fim']):

            segundo_horario_inicio_hora = f"{horario['segundo_horario_inicio'].hour}".zfill(2)
            segundo_horario_inicio_minuto = f"{horario['segundo_horario_inicio'].minute}".zfill(2)
            
            segundo_horario_fim_hora = f"{horario['segundo_horario_fim'].hour}".zfill(2)
            segundo_horario_fim_minuto = f"{horario['segundo_horario_fim'].minute}".zfill(2)

            horarios_em_texto = f"{primeiro_horario_inicio_hora}:{primeiro_horario_inicio_minuto} - {primeiro_horario_fim_hora}:{primeiro_horario_fim_minuto}, {segundo_horario_inicio_hora}:{segundo_horario_inicio_minuto} - {segundo_horario_fim_hora}:{segundo_horario_fim_minuto}"

            horarios_normalizados.append({"weekday": horario['dia_semana'], "standardSchedule": horarios_em_texto})

        else:
            horarios_em_texto = f"{primeiro_horario_inicio_hora}:{primeiro_horario_inicio_minuto} - {primeiro_horario_fim_hora}:{primeiro_horario_fim_minuto}"

            horarios_normalizados.append(
                {"weekday": horario['dia_semana'],
                "standardSchedule": horarios_em_texto
            })

        if horario['dia_semana'] == hoje:
            horario_hoje_em_texto = horarios_em_texto
        
    if(len(horario_hoje_em_texto) == 0):
        return {
        "horarios": horarios_normalizados,
        "horario_hoje": proxima_dia_de_disponibilidade(horarios),
    }

    return {
        "horarios": horarios_normalizados,
        "horario_hoje": horario_hoje_em_texto,
    }

def escritorio_esta_aberto(horarios):
    hoje = datetime.now().weekday()
    agora = datetime.now().time()
    for horario in horarios:
        if horario['dia_semana'] == hoje:

            primeiro_horario_inicio = horario['primeiro_horario_inicio']
            primeiro_horario_fim = horario['primeiro_horario_fim']

            segundo_horario_inicio = horario['segundo_horario_inicio']
            segundo_horario_fim = horario['segundo_horario_fim']

            dentro_primeiro_turno = (
                primeiro_horario_inicio is not None and
                primeiro_horario_fim is not None and
                primeiro_horario_inicio <= agora <= primeiro_horario_fim
            )
            
            dentro_segundo_turno = (
                segundo_horario_inicio is not None and
                segundo_horario_fim is not None and
                segundo_horario_inicio <= agora <= segundo_horario_fim
            )

            if dentro_primeiro_turno or dentro_segundo_turno:
                return "Aberto agora"
            else: 
                return "Fechado agora"

    return "Fechado hoje"

def telefone_ou_vazio(tel):
    if(len(tel) == 0):
        return None
    else: 
        return tel