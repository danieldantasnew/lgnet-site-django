from django.shortcuts import render
from .models import Planos, ServicosEssenciais, Vantagens

def homeView(request):
    planos = Planos.objects.all()
    essenciais = ServicosEssenciais.objects.all()
    vantagens = Vantagens.objects.all()

    context = {
        'planos': planos,
        'Essenciais': essenciais,
        'Vantagens': vantagens,
    }
    return render(request, 'lgnet_app/base.html', context)