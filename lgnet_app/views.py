from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Planos, ServicosEssenciais, Vantagens, RedeSocial, InformacoesEmpresa, Banners, Cidades

info_empresa = InformacoesEmpresa.objects.all()
redes_sociais = RedeSocial.objects.all()
cidades = Cidades.objects.all().order_by("nome")
explorar = [
    {
        "imagem": "lgnet_app/images/explorar/escritorios.png",
        "titulo": "Nossos escritórios",
        "descricao": "Conheça a localização das nossas unidades e encontre o escritório mais próximo de você.",
        "link": "escritorios",
    },
    {
        "imagem": "lgnet_app/images/explorar/contratacao.png",
        "titulo": "Contratação Digital",
        "descricao": "Solicite a instalação da sua internet sem precisar falar com um atendente.",
        "link": "contratacao",
    },
    {
        "imagem": "lgnet_app/images/explorar/trabalhe.png",
        "titulo": "Trabalhe Conosco",
        "descricao": "Se você busca um ambiente onde possa crescer, aprender e colaborar, esse é o seu lugar.",
        "link": "https://selecao.lgnetpb.com.br/",
    },
    {
        "imagem": "lgnet_app/images/explorar/faq.png",
        "titulo": "FAQ",
        "descricao": "Tire suas dúvidas com rapidez.",
        "link": "perguntas-frequentes",
    },
]

def planos_api(request):
    cidade_nome = request.GET.get("cidade")

    if not cidade_nome:
        return JsonResponse({"error": "Cidade não informada"}, status=400)

    cidade = get_object_or_404(Cidades, nome__iexact=cidade_nome)

    planos = cidade.planos.all()

    data = []
    for plano in planos:
        lista_vantagens = []
        for vantagem in plano.vantagens.all():
            lista_vantagens.append({
                "icone": vantagem.icone,
                "nome": vantagem.nome_vantagem,
            })

        lista_vantagens.append({
            "icone": plano.download.icone,
            "nome": f"Download {plano.download.velocidade}",
        })

        lista_vantagens.append({
            "icone": plano.upload.icone,
            "nome": f"Upload {plano.upload.velocidade}",
        })

        data.append({
            "icone": plano.icone,
            "categoria": plano.categoria,
            "plano": plano.plano,
            "vantagens": lista_vantagens,
            "ordem": plano.ordem,
        })

    return JsonResponse(data, safe=False)

def inicioView(request):
    planos = Planos.objects.all()
    essenciais = ServicosEssenciais.objects.all()
    vantagens = Vantagens.objects.all()
    autoatendimento = [
        {
            "icone": '<svg class="-mx-1 my-[6px] h-6 w-6" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.375 14.4H9.625C9.87292 14.4 10.0807 14.3138 10.2484 14.1413C10.4161 13.9688 10.5 13.755 10.5 13.5C10.5 13.245 10.4161 13.0313 10.2484 12.8588C10.0807 12.6863 9.87292 12.6 9.625 12.6H4.375C4.12708 12.6 3.91927 12.6863 3.75156 12.8588C3.58385 13.0313 3.5 13.245 3.5 13.5C3.5 13.755 3.58385 13.9688 3.75156 14.1413C3.91927 14.3138 4.12708 14.4 4.375 14.4ZM4.375 10.8H9.625C9.87292 10.8 10.0807 10.7138 10.2484 10.5413C10.4161 10.3688 10.5 10.155 10.5 9.9C10.5 9.645 10.4161 9.43125 10.2484 9.25875C10.0807 9.08625 9.87292 9 9.625 9H4.375C4.12708 9 3.91927 9.08625 3.75156 9.25875C3.58385 9.43125 3.5 9.645 3.5 9.9C3.5 10.155 3.58385 10.3688 3.75156 10.5413C3.91927 10.7138 4.12708 10.8 4.375 10.8ZM1.75 18C1.26875 18 0.856771 17.8238 0.514062 17.4713C0.171354 17.1188 0 16.695 0 16.2V1.8C0 1.305 0.171354 0.88125 0.514062 0.52875C0.856771 0.17625 1.26875 0 1.75 0H8.02812C8.26146 0 8.48385 0.045 8.69531 0.135C8.90677 0.225 9.09271 0.3525 9.25313 0.5175L13.4969 4.8825C13.6573 5.0475 13.7812 5.23875 13.8687 5.45625C13.9563 5.67375 14 5.9025 14 6.1425V16.2C14 16.695 13.8286 17.1188 13.4859 17.4713C13.1432 17.8238 12.7312 18 12.25 18H1.75ZM7.875 5.4V1.8H1.75V16.2H12.25V6.3H8.75C8.50208 6.3 8.29427 6.21375 8.12656 6.04125C7.95885 5.86875 7.875 5.655 7.875 5.4Z" fill="#2F4453"/></svg>',
            "titulo":"2° via da fatura" ,
            "descricao":"Baixe a segunda via de sua fatura" ,
            "link": "#",
        },
        {
            "icone": '<svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm400 240H120q-33 0-56.5-23.5T40-240v-400q0-17 11.5-28.5T80-680q17 0 28.5 11.5T120-640v400h640q17 0 28.5 11.5T800-200q0 17-11.5 28.5T760-160ZM280-400v-320 320Z"/></svg>',
            "titulo":"Renegociação",
            "descricao":"Renegocie sua dívida e reative seu cadastro",
            "link": "#",
        },
        {
            "icone": '<i class=" fa-solid fa-headset"></i>',
            "titulo":"Central de ajuda" ,
            "descricao":"Tudo que você precisa saber para tirar suas dúvidas",
            "link": "#",
        },
        {
            "icone": '<svg class="-mx-[5px] h-7 w-7" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h360v-80q0-50-35-85t-85-35q-42 0-73.5 25.5T364-751q-4 14-16.5 22.5T320-720q-17 0-28.5-11t-8.5-26q14-69 69-116t128-47q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z"/></svg>',
            "titulo":"Desbloqueio" ,
            "descricao":"Ative novamente o seu sinal",
            "link": "#",
        },
        {
            "icone": '<svg class="-mx-[3px] h-7 w-7" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M418-340q24 24 62 23.5t56-27.5l169-253q9-14-2.5-25.5T677-625L424-456q-27 18-28.5 55t22.5 61Zm62-460q36 0 71 6t68 19q16 6 34 22.5t10 31.5q-8 15-36 20t-45-1q-25-9-50.5-13.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-26-4.5-51T782-504q-6-17-2-33t18-27q13-10 28.5-6t21.5 18q15 35 23 71.5t9 74.5q1 57-13 109t-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127Q252-737 325-768.5T480-800Zm7 313Z"/></svg>',
            "titulo":"Teste de velocidade" ,
            "descricao":"Verifique a velocidade da sua internet",
            "link": "#",
        },
        {
            "icone": '<i class="fa-regular fa-comment-dots"></i>',
            "titulo":"Ouvidoria" ,
            "descricao":"Nós estamos aqui para te ouvir",
            "link": "#",
        },
    ]

    mobile = [
        {
            "icone": '<i class="fa-solid fa-file-invoice-dollar"></i>',
            "titulo": "Veja suas faturas",
            "descricao": "Acompanhe suas faturas em tempo real, com histórico completo e detalhado.",
            "span": '<span class="w-full h-[2px] bg-primary-variant/10 dark:bg-secondary/10 content-[''] inline-block absolute -bottom-6 rounded-full"></span>',
        },
        {
            "icone": '<i class="fa-solid fa-folder-open"></i>',
            "titulo": "Acesse seus contratos",
            "descricao": "Visualize seus contratos sempre que precisar, com segurança e praticidade.",
            "span": '<span class="w-full h-[2px] bg-primary-variant/10 dark:bg-secondary/10 content-[''] inline-block absolute -bottom-6 rounded-full"></span>',
        },
        {
            "icone": '<i class="fa-solid fa-house-signal"></i>',
            "titulo": "Altere nome e senha do Wi-Fi",
            "descricao": "Mude facilmente o nome e a senha da sua rede a qualquer momento pelo app.",
            "span": '',
        },
    ]

    banners = Banners.objects.all()

    context = {
        'planos': planos,
        'essenciais': essenciais,
        'vantagens': vantagens,
        'autoatendimento': autoatendimento,
        'mobiles': mobile,
        'redeSocial': redes_sociais,
        'infoEmpresa': info_empresa,
        'explorar': explorar,
        'banners': banners,
        'cidades': cidades,
    }


    return render(request, 'lgnet_app/pages/principal/index.html', context)

def sobreView(request):
    context = {
        'infoEmpresa': info_empresa,
        'redeSocial': redes_sociais,
        'cidades': cidades,
        'explorar': explorar,
    }

    return render(request, 'lgnet_app/pages/sobre/index.html', context)

def contatoView(request):
    context = {
        'infoEmpresa': info_empresa,
        'redeSocial': redes_sociais,
        'cidades': cidades,
        'explorar': explorar,
    }
    return render(request, 'lgnet_app/pages/contato/index.html', context)