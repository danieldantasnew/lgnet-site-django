from django.db import models

class Vantagens(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-laptop"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    nome_vantagem = models.CharField(("Nome da vantagem/serviço incluído"), max_length=50, help_text="Exemplo: instalação grátis")
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

class Planos(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-laptop"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    categoria = models.CharField(("Categoria"), max_length=100, help_text="Exemplo: Básico")
    plano = models.CharField(("Plano"), default="300MEGA", max_length=100)
    destaque = models.BooleanField(default=False, help_text="marque esta opção se deseja destacar o plano")
    download = models.CharField(("Download"), max_length=100, help_text="Exemplo: 200Mbps")
    upload = models.CharField(("Upload"), max_length=100, help_text="Exemplo: 100Mbps")
    vantagens = models.ManyToManyField(Vantagens, related_name="planos", help_text="Escolha as vantagens incluídas neste plano")
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

class ServicosEssenciais(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-laptop"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    titulo = models.CharField(("Título do cartão"), max_length=50)
    descricao = models.TextField(("Descrição"))
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)