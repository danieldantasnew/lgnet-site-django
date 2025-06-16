from django.contrib import admin
from .models import Planos, ServicosEssenciais, Vantagens

class VantagensAdmin(admin.ModelAdmin):
    list_display = ("icone", "nome_vantagem",)

class PlanosAdmin(admin.ModelAdmin):
    list_display = ("icone","categoria", "velocidade", "destaque", "download", "upload", "criado_em", "ultima_atualizacao")

class ServicosAdmin(admin.ModelAdmin):
    pass

admin.site.register(Planos, PlanosAdmin)
admin.site.register(ServicosEssenciais, ServicosAdmin)
admin.site.register(Vantagens, VantagensAdmin)