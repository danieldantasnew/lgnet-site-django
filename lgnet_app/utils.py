import math

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