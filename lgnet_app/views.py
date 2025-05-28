from django.shortcuts import render

def homeView(request):
    return render(request, 'lgnet_app/base.html',);