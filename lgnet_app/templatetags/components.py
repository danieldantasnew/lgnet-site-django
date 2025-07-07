from django import template

register = template.Library()

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

@register.inclusion_tag('lgnet_app/partials/card_autoatendimento.html', takes_context=True)
def render_autoatendimento(context, *args, **kwargs):
    icone = kwargs.get('icone', None)
    titulo = kwargs.get('titulo', None)
    descricao = kwargs.get('descricao', None)
    link = kwargs.get('link', None)

    return {
        'icone': icone,
        'titulo': titulo,
        'descricao': descricao,
        'link': link,
    }