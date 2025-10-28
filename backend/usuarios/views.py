from django.views.decorators.csrf import csrf_exempt
from .models import Turma
from django.http import JsonResponse
from usuarios.models import AlunoProfile,ProfessorProfile

@csrf_exempt
def mostrar_turmas(request):
    if request.method == 'GET':
    
        turmas = Turma.objects.all()
        turmas_list = [{"id":t.id,"Nome_Turma":t.nome_turma}for t in turmas.order_by("nome_turma")] 

        if not turmas.exists():
            return JsonResponse({"erro":"Nenhuma Turma encontrada!"}, status=204)

        return JsonResponse({"Turmas": turmas_list}, status=200)
    
    return JsonResponse({"erro":"Método não permitido. Use GET"}, status=405)

@csrf_exempt
def mostrar_alunos(request):
    if request.method == 'GET':
        alunos = AlunoProfile.objects.all()
        alunos_list = [
            {
                "Id_Aluno": ap.user.id,
                "Nome_Aluno": ap.user.username,
                "Role": ap.user.role,
                "Turma": ap.turma.nome_turma if ap.turma else None,
            }
            for ap in alunos.order_by("id")
        ]

        if not alunos.exists():
            return JsonResponse({"erro":"Nenhum aluno(a) encontrado(a)!"}, status=204)

        return JsonResponse({"Alunos": alunos_list}, status=200)
    
    return JsonResponse({"erro":"Método não permitido. Use GET"}, status=405)

@csrf_exempt
def mostrar_alunos_sem_grupo(request):
    if request.method == 'GET':

        alunos = AlunoProfile.objects.filter(grupo__isnull=True)
        alunos_list = [
            {
                "Id_Aluno": ap.id,
                "Nome_Aluno": ap.user.username,
                "Role": ap.user.role,
                "Turma": ap.turma.nome_turma if ap.turma else None,
            }
            for ap in alunos.order_by("id")
        ]

        return JsonResponse(alunos_list,safe=False, status=200)
    
    return JsonResponse({"erro":"Método não permitido. Use GET"}, status=405)

@csrf_exempt
def mostrar_professores(request):
    if request.method == 'GET':

        try:
            professores = ProfessorProfile.objects.all()
            professores_list = [{"Id_Professor":p.user.id, "Nome_Professor":p.user.username} for p in professores.order_by("id")]

            return JsonResponse({"Professores":professores_list}, status=200)
        
        except ProfessorProfile.DoesNotExist:
            return JsonResponse({"erro": "Professor não encontrado"}, status=204)
        
    return JsonResponse({"erro":"Método não permitido. Use GET"}, status=405)
        


        