# Generated by Django 5.2.1 on 2025-06-21 13:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lgnet_app', '0009_cidades_redesocial_alter_download_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cidades',
            options={'verbose_name': 'Cidades', 'verbose_name_plural': 'Cidades'},
        ),
        migrations.AlterModelOptions(
            name='informacoesempresa',
            options={'verbose_name': 'Informações Empresa', 'verbose_name_plural': 'Informações Empresa'},
        ),
        migrations.AlterModelOptions(
            name='redesocial',
            options={'verbose_name': 'Rede Social', 'verbose_name_plural': 'Redes Sociais'},
        ),
        migrations.RemoveField(
            model_name='informacoesempresa',
            name='redes_sociais',
        ),
    ]
