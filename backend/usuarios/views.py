from django.shortcuts import render
from .models import Turma
from django.http import HttpResponse,JsonResponse

def MostrarTurmas(request):
    turma = Turma.objects.all()
    turmas = [{"NomeTurma":t.NomeTurma}for t in turma.order_by("NomeTurma")] 

    if not turma.exists:
        return JsonResponse({"erro":"Nenhuma Turma encontrada!"}, status=400)

    return JsonResponse({"Turma": turmas}, status=200)

