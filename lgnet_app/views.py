from django.shortcuts import render
from .models import Planos, ServicosEssenciais, Vantagens

def homeView(request):
    planos = Planos.objects.all()
    essenciais = ServicosEssenciais.objects.all()
    vantagens = Vantagens.objects.all()

    context = {
        'planos': planos,
        'essenciais': essenciais,
        'vantagens': vantagens,
    }
    return render(request, 'lgnet_app/base.html', context)