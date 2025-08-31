from django.contrib import admin
from .models import User, AlunoProfile, ProfessorProfile, Turma

admin.site.register(User)
admin.site.register(AlunoProfile)
admin.site.register(ProfessorProfile)
admin.site.register(Turma)

