# PAINEL INTEGRADOR

## Como rodar o backend do projeto:

### Clonar o Projeto e Instalar as dependências:

1. Baixe o git , Python e SQLite.
2. Abra o terminal na pasta na qual deseja abrir o arquivo.
3. Clone o repositorio:   
```bash
git clone https://github.com/Taynah-M-Alves/Painel-Integrador.git
```
4. Instale as dependências:
```bash
    pip install -r requirements.txt
```

### Configurando o banco de dados:
1. Crie as migrations :    
    No terminal, navegue até a pasta onde está a aplicação python e execute o comando:    
      ```bash
     python manage.py makemigrations
      ```
     
2. Migrate:    
   Ainda no mesmo terminal execute:     
   ```bash
   python manage.py migrate
   ```
### Execute o Server:

1. Crie um super user:      
    ```bash
    python manage.py createsuperuser
    ```
   
2. Rodar o Server:
    ```bash
    python manage.py runserver
    ```

### "Visualizar" o backend:  

2 Opções:
  1ª  Acesse o link que aparece no terminal ao executar o runserver e acesse a rota '/admin' para visualizar o painel administrador do projeto.

  2ª Acesse o POSTMAN através do link 
    ```bash
   https://taynah.postman.co/workspace/My-Workspace~22fac5d5-f2c7-451f-86a4-9c1bc1697b70/collection/44803258-40cdfd56-1469-46fb-9bbb-90ef921c994a?action=share&creator=44803258
    ```
    
# ROTAS:
### Usuarios:

- GET -->  / usuarios/ professores   
 <sub>Mostra todos os professores criados</sub> 
- GET --> /usuarios / alunos   
  <sub>Mostra todos os alunos criados</sub> 
- GET --> /usuarios / turmas   
  <sub>Mostra todos as turmas criados</sub> 

### Projeto Integrador:

- GET -->  /projetos/   
  <sub>Mostra todos os projetos criados</sub>  
- POST --> /projetos/   
  <sub>Cria os projetos</sub>
- GET -->  /projetos/ < int:id >   
  <sub>Ver os grupos do projeto id passada na requisição</sub>

### Grupo:

- GET --> grupos/   
  <sub>Mostra todos os grupos criados</sub> 
- POST --> grupos/   
  <sub>Cria grupos</sub>
- GET --> grupos/< int:id >   
  <sub>Mostra o projeto da id passada na requisição</sub> 
- PATCH --> 'grupos/< int:id > /adicionar-integrante   
  <sub> Adiciona um integrante ao grupo da id passada na requisição</sub>
- PATCH --> grupos/< int:id > / atribuir-lideranca
  <sub>atribui lideranca a um integrante do grupo da id passada na requisição</sub>   
