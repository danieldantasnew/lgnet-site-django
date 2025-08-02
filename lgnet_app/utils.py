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

def horarios_disponiveis_escritorio(horarios):
    for horario in horarios:
        if horario['dia_semana'] == datetime.now().weekday():
            primeiro_horario_inicio_hora = f"{horario['primeiro_horario_inicio'].hour}".zfill(2)
            primeiro_horario_inicio_minuto = f"{horario['primeiro_horario_inicio'].minute}".zfill(2)
            
            primeiro_horario_fim_hora = f"{horario['primeiro_horario_fim'].hour}".zfill(2)
            primeiro_horario_fim_minuto = f"{horario['primeiro_horario_fim'].minute}".zfill(2)


            
            segundo_horario_inicio_hora = f"{horario['segundo_horario_inicio'].hour}".zfill(2)
            segundo_horario_inicio_minuto = f"{horario['segundo_horario_inicio'].minute}".zfill(2)
            
            segundo_horario_fim_hora = f"{horario['segundo_horario_fim'].hour}".zfill(2)
            segundo_horario_fim_minuto = f"{horario['segundo_horario_fim'].minute}".zfill(2)


            print(f"{primeiro_horario_inicio_hora}:{primeiro_horario_inicio_minuto} - {primeiro_horario_fim_hora}:{primeiro_horario_fim_minuto}, {segundo_horario_inicio_hora}:{segundo_horario_inicio_minuto} - {segundo_horario_fim_hora}:{segundo_horario_fim_minuto}")
            # return f"{inicio_hora}:{inicio_minuto} - {fim_hora}:{fim_minute}"
    return horarios