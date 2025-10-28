from rest_framework import serializers
from .models import projIntegrador

class ProjetoSerializer(serializers.ModelSerializer):
    professor_nome = serializers.CharField(source='ProfessorProfile.user.username', read_only=True)
    turma_nome = serializers.CharField(source='turma.nome_turma', read_only=True)

    class Meta:
        model = projIntegrador
        fields = [
            'id',
            'tema',
            'descricao',
            'professor',
            'turma',
            'professor_nome',
            'turma_nome',
        ]