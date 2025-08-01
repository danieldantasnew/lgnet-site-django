from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Planos, ServicosEssenciais, Vantagens, Upload, Download, RedeSocial, Cidades, InformacoesEmpresa, Banners, Valores

class DownloadAdmin(admin.ModelAdmin):
    list_display = ("velocidade", "icone",)

class UploadAdmin(admin.ModelAdmin):
    list_display = ("velocidade", "icone",)

class VantagensAdmin(admin.ModelAdmin):
    list_display = ("nome_vantagem", "icone",)

class PlanosAdmin(admin.ModelAdmin):
    list_display = ("categoria", "ordem", "icone", "plano", "download", "upload", "criado_em", "ultima_atualizacao")
    ordering = ("ordem",)

class ServicosAdmin(admin.ModelAdmin):
    list_display = ("titulo", "icone", "descricao", "criado_em", "ultima_atualizacao",)

class RedeSocialAdmin(admin.ModelAdmin):
    list_display = ("nome", "link", "icone",)

class CidadesAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "estado", "sigla_estado", "cep", "latitude", "longitude",)
    ordering = ("nome",)

class ValoresAdmin(admin.ModelAdmin):
    list_display = ("nome", "icone", "criado_em", "ultima_atualizacao")
    

class InformacoesEmpresaAdmin(admin.ModelAdmin):
    list_display = ("nome_empresa", "endereco_completo", "email", "contato")

    def has_add_permission(self, request):
        return not InformacoesEmpresa.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
    
class BannersAdmin(admin.ModelAdmin):
    list_display = ("titulo", "imagem_principal", "imagem_de_fundo",)

admin.site.register(Planos, PlanosAdmin)
admin.site.register(ServicosEssenciais, ServicosAdmin)
admin.site.register(Vantagens, VantagensAdmin)
admin.site.register(Upload, UploadAdmin)
admin.site.register(Download, DownloadAdmin)
admin.site.register(RedeSocial, RedeSocialAdmin)
admin.site.register(Cidades, CidadesAdmin)
admin.site.register(InformacoesEmpresa, InformacoesEmpresaAdmin)
admin.site.register(Valores, ValoresAdmin)
admin.site.register(Banners, BannersAdmin)