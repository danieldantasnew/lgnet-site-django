from django.db import models
import datetime

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
    vantagens = models.ManyToManyField(Vantagens, related_name="planos", help_text="Escolha as vantagens incluídas neste plano")
    download = models.ForeignKey(Download, on_delete=models.CASCADE, null=True,
    blank=True, related_name="planos")
    upload = models.ForeignKey(Upload, on_delete=models.CASCADE, null=True,
    blank=True, related_name="planos")
    ordem = models.IntegerField("Ordem do plano", default=0, help_text="Definir ordem em que os planos são mostrados. Exemplo: Plano de 100Mb vem primeiro então o número é 1, 200Mb 2 e assim por diante.")

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
    planos = models.ManyToManyField("Planos", related_name="cidades", help_text="Planos disponíveis nesta cidade")

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
    
class Valores(models.Model):
    icone = models.TextField("Ícone", help_text="Pode ser colocado código fontawesome ou svg")
    nome = models.CharField("Nome", max_length=80)

    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Valor"
        verbose_name_plural = "Valores"

    def __str__(self):
        return f"{self.nome}"
    
class InformacoesEmpresa(models.Model):
    nome_empresa = models.CharField("Nome da empresa", max_length=50)
    slogan = models.CharField("Slogan", default="", max_length=80)
    endereco_completo = models.TextField("Endereço completo")
    email = models.EmailField("Email")
    contato = models.CharField("Telefone", max_length=100)

    sobre = models.TextField("Sobre", default="")
    imagem_sobre = models.ImageField("Imagem da Seção sobre", upload_to="sobre/", height_field=None, width_field=None, max_length=None, null=True, blank=True)

    visao = models.CharField("Visão da empresa", max_length=132, default="")
    missao = models.CharField("Missão da empresa", max_length=132, default="")
    imagem_visao_missao = models.ImageField("Imagem da Seção sobre", upload_to="sobre/", height_field=None, width_field=None, max_length=None, null=True, blank=True)

    atuacao = models.TextField("Atuação", default="")
    forca = models.TextField("Força", default="")
    valores = models.ManyToManyField("Valores", verbose_name=("Valores"), related_name="valores", blank=True)
    
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Informações Empresa"
        verbose_name_plural = "Informações Empresa"

    def __str__(self):
        return f"{self.nome_empresa}"
        
class Banners(models.Model):
    titulo = models.CharField("Titulo do Banner", max_length=50)
    imagem_principal = models.ImageField("Imagem Principal", upload_to="banners/", height_field=None, width_field=None, max_length=None, help_text="Sugestão: Insira uma imagem com resolução 1244px de largura e 464px de altura para desktop")
    
    imagem_de_fundo= models.ImageField("Imagem de Fundo", upload_to="banners/", height_field=None, width_field=None, max_length=None, help_text="Pode ser qualquer resolução de imagem mas o ideal é uma altura de 464px para desktop")
    
    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Banners"
        verbose_name_plural = "Banners"

    def __str__(self):
        return f"{self.titulo}"
    
class Escritorio(models.Model):
    nome = models.CharField("Nome do escritório", max_length=70)
    endereco = models.TextField("Endereço exato")
    latitude = models.CharField("Latitude", max_length=20)
    longitude = models.CharField("Longitude", max_length=20)
    telefone = models.CharField("Telefone", max_length=20, default="", null=True, blank=True)

    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        verbose_name = "Escritorio"
        verbose_name_plural = "Escritorios"

    def __str__(self):
        return f"{self.nome}"

class HorarioFuncionamento(models.Model):
    DIAS_DA_SEMANA = [
        (0, 'Segunda-feira'),
        (1, 'Terça-feira'),
        (2, 'Quarta-feira'),
        (3, 'Quinta-feira'),
        (4, 'Sexta-feira'),
        (5, 'Sábado'),
        (6, 'Domingo'),
    ]

    escritorio = models.ForeignKey(Escritorio, on_delete=models.CASCADE,related_name="horarios")
    dia_semana = models.IntegerField(choices=DIAS_DA_SEMANA, unique=False)
    primeiro_horario_inicio = models.TimeField("Horário de Início do 1º turno",default=datetime.time(8, 0))
    primeiro_horario_fim = models.TimeField("Horário de Encerramento do 1º turno", default=datetime.time(12, 0))

    tem_segundo_turno = models.BooleanField("Tem segundo turno?", default=True)
    
    segundo_horario_inicio = models.TimeField("Horário de Início do 2º turno",default=datetime.time(14, 0), blank=True, null=True)
    segundo_horario_fim = models.TimeField("Horário de Encerramento do 2º turno", default=datetime.time(18, 0), blank=True, null=True)

    criado_em = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField('Última atualização', auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['escritorio', 'dia_semana'], name='dia_unico_por_escritorio')
        ]
        verbose_name = "Horário Funcionamento"
        verbose_name_plural = "Horário Funcionamento"

    def __str__(self):
        if self.tem_segundo_turno:
            return f"{self.dia_semana}: {self.primeiro_horario_inicio}–{self.primeiro_horario_fim} e {self.segundo_horario_inicio}–{self.segundo_horario_fim}"
        
        return f"{self.dia_semana}: {self.primeiro_horario_inicio}–{self.primeiro_horario_fim}"
    
class PerguntasFrequentes(models.Model):
    titulo = models.CharField("Título", max_length=100)
    descricao = models.TextField("Descrição")

    class Meta:
        verbose_name = "Perguntas Frequentes"
        verbose_name_plural = "Perguntas Frequentes"