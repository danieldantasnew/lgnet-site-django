from django import template

register = template.Library()

@register.inclusion_tag('lgnet_app/partials/card.html', takes_context=True)
def render_card(context, *args, **kwargs):
    categoria = kwargs.get('categoria', None)
    velocidade = kwargs.get('velocidade', None)
    destaque = kwargs.get('destaque', False)
    download = kwargs.get('download', False)
    upload = kwargs.get('upload', False)
    
    if isinstance(destaque, str):
        destaque = destaque.lower() in ('true', '1', 'yes')

    return {
        'categoria': categoria,
        'velocidade': velocidade,
        'destaque': destaque,
        'download': download,
        'upload': upload,
    }
