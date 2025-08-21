from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('lgnet_app', '0034_alter_perguntasfrequentes_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='perguntasfrequentes',
            old_name='descricao',
            new_name='resposta',
        ),
    ]
