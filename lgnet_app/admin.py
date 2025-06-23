from django.contrib import admin
from .models import Planos, ServicosEssenciais, Vantagens, Upload, Download, RedeSocial, Cidades, InformacoesEmpresa, ExploreMais

class DownloadAdmin(admin.ModelAdmin):
    list_display = ("velocidade", "icone",)

class UploadAdmin(admin.ModelAdmin):
    list_display = ("velocidade", "icone",)

class VantagensAdmin(admin.ModelAdmin):
    list_display = ("nome_vantagem", "icone",)

class PlanosAdmin(admin.ModelAdmin):
    list_display = ("categoria", "icone", "plano", "destaque", "download", "upload", "criado_em", "ultima_atualizacao")

class ServicosAdmin(admin.ModelAdmin):
    list_display = ("titulo", "icone", "descricao", "criado_em", "ultima_atualizacao")

class RedeSocialAdmin(admin.ModelAdmin):
    list_display = ("nome", "link", "icone",)

class CidadesAdmin(admin.ModelAdmin):
    pass

class ExploreMaisAdmin(admin.ModelAdmin):
    list_display = ("titulo", "descricao", "link",)

class InformacoesEmpresaAdmin(admin.ModelAdmin):
    list_display = ("nome_empresa", "endereco_completo", "email", "contato")
    def has_add_permission(self, request):
        return not InformacoesEmpresa.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Planos, PlanosAdmin)
admin.site.register(ServicosEssenciais, ServicosAdmin)
admin.site.register(Vantagens, VantagensAdmin)
admin.site.register(Upload, UploadAdmin)
admin.site.register(Download, DownloadAdmin)
admin.site.register(RedeSocial, RedeSocialAdmin)
admin.site.register(Cidades, CidadesAdmin)
admin.site.register(InformacoesEmpresa, InformacoesEmpresaAdmin)
admin.site.register(ExploreMais, ExploreMaisAdmin)