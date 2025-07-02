from django.db import models

class Download(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-download"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    velocidade = models.CharField("Velocidade", default="300Mbps", max_length=1000)
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Velocidade - Download"
        verbose_name_plural = "Velocidade - Download"

    def __str__(self):
        return f"{self.velocidade}"
    
    @property
    def nome_vantagem(self):
        return f"Download {self.velocidade}"

class Upload(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-upload"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    velocidade = models.CharField("Velocidade", default="150Mbps", max_length=1000)
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Velocidade - Upload"
        verbose_name_plural = "Velocidade - Upload"

    def __str__(self):
        return f"{self.velocidade}"
    
    @property
    def nome_vantagem(self):
        return f"Upload {self.velocidade}"

class Vantagens(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-laptop"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    nome_vantagem = models.CharField("Nome da vantagem/serviço incluído", max_length=50, help_text="Exemplo: instalação grátis")
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Vantagens"
        verbose_name_plural = "Vantagens"

    def __str__(self):
        return f"{self.nome_vantagem}"

class Planos(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-laptop"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    categoria = models.CharField("Categoria", max_length=100, help_text="Exemplo: Básico")
    plano = models.CharField("Plano", default="300MEGA", max_length=100)
    destaque = models.BooleanField(default=False, help_text="marque esta opção se deseja destacar o plano")
    vantagens = models.ManyToManyField(Vantagens, related_name="planos", help_text="Escolha as vantagens incluídas neste plano")
    download = models.ForeignKey(Download, on_delete=models.CASCADE, null=True,
    blank=True, related_name="planos")
    upload = models.ForeignKey(Upload, on_delete=models.CASCADE, null=True,
    blank=True, related_name="planos")

    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Planos"
        verbose_name_plural = "Planos"

    def __str__(self):
        return f"{self.categoria}"

class ServicosEssenciais(models.Model):
    icone = models.TextField("Ícone", default='<i class="fa-solid fa-laptop"></i>', help_text="Cole um ícone do FontAwesome ou código SVG")
    titulo = models.CharField("Título do cartão", max_length=50)
    descricao = models.TextField("Descrição")
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Serviços Essenciais"
        verbose_name_plural = "Serviços Essenciais"

    def __str__(self):
        return f"{self.titulo}"
    
class Cidades(models.Model):
    nome = models.CharField("Nome", help_text="Nome da cidade", max_length=100)
    estado = models.CharField("Estado", max_length=100)
    sigla_estado = models.CharField("Sigla do Estado", max_length=4, default="PB")
    cep = models.CharField("CEP", help_text="58700-000", max_length=10)
    latitude = models.TextField("Latitude")
    longitude = models.TextField("Longitude")
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Cidades"
        verbose_name_plural = "Cidades"

    def __str__(self):
        return f"{self.nome} - {self.estado}"

class RedeSocial(models.Model):
    nome = models.CharField("Nome", max_length=50)
    link = models.TextField("Link da rede social")
    icone = models.TextField("Ícone")
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Rede Social"
        verbose_name_plural = "Redes Sociais"

    def __str__(self):
        return f"{self.nome}"
    
class InformacoesEmpresa(models.Model):
    nome_empresa = models.CharField("Nome da empresa", max_length=50)
    endereco_completo = models.TextField("Endereço completo")
    email = models.EmailField("Email")
    contato = models.CharField("Telefone", max_length=100)
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Informações Empresa"
        verbose_name_plural = "Informações Empresa"

    def __str__(self):
        return f"{self.nome_empresa}"
        
class ExploreMais(models.Model):
    titulo = models.CharField("Título", max_length=50)
    descricao = models.TextField("Descrição")
    link = models.CharField("Rota", max_length=20)
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Explore Mais"
        verbose_name_plural = "Explore Mais"

    def __str__(self):
        return f"{self.titulo}"

class Banners(models.Model):
    titulo = models.CharField("Titulo do Banner", max_length=50)
    imagem_principal = models.ImageField("Imagem Principal", upload_to="banners/", height_field=None, width_field=None, max_length=None)
    
    imagem_de_fundo= models.ImageField("Imagem de Fundo", upload_to="banners/", height_field=None, width_field=None, max_length=None)
    
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Banners"
        verbose_name_plural = "Banners"

    def __str__(self):
        return f"{self.titulo}"