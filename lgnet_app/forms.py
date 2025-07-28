from django import forms
from django.core.validators import RegexValidator

class ContatoForm(forms.Form):
    nome_completo = forms.CharField(label="Nome Completo", widget=forms.TextInput(attrs={
            'placeholder': 'Digite seu nome completo',
        }))
    email = forms.EmailField(label="E-mail", widget=forms.EmailInput(attrs={
        'placeholder':  "Digite o seu e-mail",
    }))
    telefone = forms.CharField(
        label='Telefone',
        max_length=15,
        validators=[
            RegexValidator(
                regex=r'^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$',
                message='Digite um número de telefone válido.'
            )
        ],
        widget=forms.TextInput(attrs={
            'placeholder': "(99) 99999-9999",
            "data-form-contato": True,
        })
    )
    assunto = forms.CharField(label="Assunto", widget=forms.TextInput(attrs={
        'placeholder': "Do que se trata?",
    }))
    mensagem = forms.CharField(label="Mensagem", widget=forms.Textarea(attrs={
        'placeholder': "Diga como podemos ajudar",
    }))