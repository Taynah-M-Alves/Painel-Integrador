🎯 Objetivo do Projeto:
Desenvolver uma aplicação web progressiva (PWA) como extensão do site da faculdade, com o propósito de gerenciar e documentar as etapas dos Projetos Integradores realizados pelos alunos, proporcionando um ambiente centralizado de organização, acompanhamento e colaboração entre alunos e professores.
________________________________________
❗ Problema que o Projeto Busca Sanar:
•	Desorganização e falta de rastreabilidade das etapas dos projetos integradores;
•	Ausência de uma plataforma unificada para distribuição de tarefas e entregas entre alunos e professores;
•	Dificuldade no acompanhamento de prazos, metas e status das tarefas;
•	Falta de clareza no papel de cada integrante do grupo e ausência de liderança formal;
•	Inexistência de um repositório de entregas por grupo que mostre o histórico e penalidades por atraso.
________________________________________
📋 Regras de Negócio:
1.	Formação de Grupos:
o	Cada grupo terá no máximo 5 integrantes.
o	Os grupos são formados e atribuídos pelo professor da disciplina.
2.	Entregas/Eventos:
o	Professores podem criar eventos/entregas com:
	Descrição
	Prazo de entrega
	Tipo de arquivo exigido
o	Esses eventos/entregas são globais, isso é, o professor cria um evento que será aplicado para todos os grupos do projeto Integrador respectivo

3.	Tarefas:
o	Podem ser criadas:
	Pelo professor, para um grupo;
	Pelo líder do grupo, apenas para seu grupo.
o	Devem conter:
	Descrição
	Responsável (no caso de tarefas internas do grupo)
	Prazo
	Tipo de arquivo (opcional)
o	Tarefas terão status: em aguardo, em execução, concluída, atrasada.
4.	Status de Tarefa:
o	Alterações de status podem depender da entrega de arquivos.
o	Tarefas entregues após o prazo terão status atrasada.
o	É permitido adicionar arquivos, mas não substituir nem excluir entregas anteriores.
5.	Permissões de Edição:
o	Alunos e professores não podem apagar entregas.
o	Apenas professores podem atribuir ou remover o cargo de líder do grupo.
________________________________________
👤 Funcionalidades por Tipo de Usuário:
👨‍🏫 Professor:
•	Visualizar alunos da disciplina e formar grupos (máx. 5 integrantes).
•	Atribuir/remover a função de líder a um aluno do grupo.
•	Criar tarefas para:
o	Um grupo específico
o	Toda a turma
•	Criar entregas/eventos com prazos e descrições.
•	Acompanhar:
o	Progresso de tarefas dos grupos
o	Entregas realizadas e atrasadas
o	Cronogramas dos grupos
________________________________________
👩‍🎓 Líder do Grupo:
•	Criar tarefas internas do grupo com:
o	Descrição
o	Prazo
o	Responsável
•	Visualizar e gerenciar (não apagar) tarefas do grupo.
•	Submeter arquivos de entrega.
•	Acompanhar metas, eventos, cronograma e tarefas.
________________________________________
👥 Aluno:
•	Visualizar:
o	Tarefas do grupo
o	Tarefas atribuídas a si
o	Eventos/entregas
o	Cronograma, temática e problematização do projeto
•	Entregar arquivos dentro dos prazos estabelecidos.
•	Acompanhar status das tarefas e entregas.
________________________________________
📌 Funcionalidades Gerais (Sistema):
•	Painel do Grupo:
o	Tarefas do grupo
o	Tarefas do usuário logado
o	Metas
o	Eventos/Entregas
o	Cronograma
o	Temática e problematização do projeto
o	Número e identificação do grupo
•	Gerenciamento de Tarefas:
o	Criação de tarefas com:
	Descrição
	Responsável
	Prazo
	Status
	Upload de arquivos
o	Alteração de status condicionada ao envio de arquivos
o	Detecção automática de atraso
•	Sistema de Entregas:
o	Upload de múltiplos arquivos sem sobrescrever anteriores
o	Registro de data e hora da entrega
•	Controle de Permissões:
o	Restrições de exclusão de entregas
o	Controle sobre criação de tarefas por tipo de usuário

