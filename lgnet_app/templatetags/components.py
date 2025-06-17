from django import template

register = template.Library()

@register.inclusion_tag('lgnet_app/partials/card_planos.html', takes_context=True)
def render_card(context, *args, **kwargs):
    icone = kwargs.get('icone', None)
    categoria = kwargs.get('categoria', None)
    velocidade = kwargs.get('velocidade', None)
    destaque = kwargs.get('destaque', False)
    download = kwargs.get('download', None)
    upload = kwargs.get('upload', None)
    vantagens_raw = kwargs.get('vantagens', False)
    vantagens = list(vantagens_raw.all()) if vantagens_raw else []

    if download:
        vantagens.append(download)
    if upload:
        vantagens.append(upload)
    
    if isinstance(destaque, str):
        destaque = destaque.lower() in ('true', '1', 'yes')

    return {
        'icone': icone,
        'categoria': categoria,
        'velocidade': velocidade,
        'destaque': destaque,
        'vantagens': vantagens,
    }

@register.inclusion_tag('lgnet_app/partials/card_essencial.html', takes_context=True)
def render_servico_essencial(context, *args, **kwargs):
    icone = kwargs.get('icone', None)
    titulo = kwargs.get('titulo', None)
    descricao = kwargs.get('descricao', None)

    return {
        'icone': icone,
        'titulo': titulo,
        'descricao': descricao,
    }