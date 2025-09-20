# PAINEL INTEGRADOR

## Como rodar o projeto:

1. Baixe o git e o Python.
2. Abra o terminal na pasta na qual deseja abrir o arquivo.
3. Clone o repositorio:   
```bash
git clone https://github.com/Taynah-M-Alves/Painel-Integrador.git
```
4. Instale as dependências:
```bash
    pip install -r requirements.txt
```

## Configurando o banco de dados:
1.   Crie as migrations :    
    No terminal, navegue até a pasta onde está a aplicação python e execute o comando:    
      ```bash
     python manage.py makemigrations
      ```
     
3. Migrate:    
   Ainda no mesmo terminal execute:     
   ```bash
   python manage.py migrate
   ```
   
# ROTAS:
### Usuarios:

- GET -->  '/ usuarios/ verprofessores/'
- GET --> '/usuarios / veralunos/'
- GET --> '/usuarios / verturmas/'

### Projeto Integrador:

- POST --> '/projetos/criar/'
- GET -->  '/projetos/'  
  <sub>Ver todos os projetos Integradores </sub>
- GET -->  '/projetos/verporid/ [<int:id>]  '
  <sub>Ver os grupos do projeto id passada na requisição</sub>

### Grupo:

- GET --> 'grupo/'
- POST --> 'grupo/criar/'
- PATCH --> 'grupo/adicionarIntegrante/[<int:id>]'
- PATCH --> 'atribuirLideranca/[<int:id>]'
