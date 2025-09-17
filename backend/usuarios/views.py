
from .models import Turma
from django.http import JsonResponse
from usuarios.models import AlunoProfile,ProfessorProfile, User

def MostrarTurmas(request):
    turmas = Turma.objects.all()
    turmas_list = [{"Nome_Turma":t.nome_turma}for t in turmas.order_by("nome_turma")] 

    if not turmas.exists():
        return JsonResponse({"erro":"Nenhuma Turma encontrada!"}, status=400)

    return JsonResponse({"Turmas": turmas_list}, status=200)

def MostrarAlunos(request):
    alunos = AlunoProfile.objects.all()
    alunos_list = [
        {
            "Id_Aluno": ap.user_id.id,
            "Nome_Aluno": ap.user_id.username,
            "Role": ap.user_id.role,
            "Turma": ap.turma_id.nome_turma if ap.turma_id else None,
        }
        for ap in alunos.order_by("id")
    ]

    if not alunos.exists():
        return JsonResponse({"erro":"Nenhum aluno(a) encontrado(a)!"}, status=400)

    return JsonResponse({"Alunos": alunos_list}, status=200)

def MostrarProfessores(request):
    if request.method == 'GET':

        try:
            professores = ProfessorProfile.objects.all()
            professores_list = [{"Id_Professor":p.user_id.id, "Nome_Professor":p.user_id.username} for p in professores.order_by("id")]

            return JsonResponse({"Professores":professores_list}, status=200)
        
        except ProfessorProfile.DoesNotExist:
            return JsonResponse({"erro": f"Professor não encontrado"}, status=400)
        


        