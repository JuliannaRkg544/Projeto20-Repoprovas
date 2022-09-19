# Projeto20-Repoprovas

An aplication for students to share tests informations. With this API you can search for old tests to help you in your studies
or send old tests to help others students.

## Rotas

POST /signup
    - Route to signup a new user 
    
    
    - headers: {}
    
    
    - body:
        {
            "email": "email@gmail.com",
            "password": "emailzinho",
            "confirmPassword": "emailzinho"
        }
        
        
 POST /signin
    - Route to login a user
    
    
    - headers: {}
    
    
    - body:
        {  "email": "email@gmail.com",
            "password": "emailzinho",
        }



POST /exam/creation (autenticada) - Route to post a new exam
    
    
    - headers: { "Authorization": "Bearer $token" }
    
    
    - body:
        {
            "name": "earum",
            "pdfUrl": "http://nimble-archer.name",
            "categoryId": 2,
            "teacherDisciplineId": 4
        }
        
        
        
 GET /exams/discipline (autenticada) - Route to list all tests group by discipline
 
 
    - headers: { "Authorization": "Bearer $token" }
    - body: {}

GET /tests/teacher (autenticada) - Route to list all tests group by teacher


    - headers: { "Authorization": "Bearer $token" }
    - body: {}
