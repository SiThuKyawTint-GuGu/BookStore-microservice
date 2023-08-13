
## Api Route
## User-services
- http://localhost:8000/register/api/users/createuser                             - Register
- http://localhost:8000/login/api/users/loginUser                                 - Login

## Customer-services
- http://localhost:8000/customer/register/api/customers/createcustomer            - Register
- http://localhost:8000/customer/edit/api/customers/editcustomer?id=1             - Edit 
- http://localhost:8000/customer/destory/api/customers/destorycustomer?id=1       - Delete
- http://localhost:8000/customer/login/api/customers/logincustomer                - Login
- http://localhost:8000/customer/getlist/api/customers/getcustomer                - GetList

## Book-services
- http://localhost:8000/book/store/api/books/createbook                           - Create
- http://localhost:8000/book/getlist/api/books/getbookList                        - GetList 

## Feedback-services
- http://localhost:8000/feedback/store/api/feedbacks/createfeedback               - Create
- http://localhost:8000/feedback/getlist/api/feedbacks/getfeedbacklist            - GetList 

## Sale-services
- http://localhost:8000/salebook/store/api/salebooks/createbookasle               - Create
- http://localhost:8000/salebook/getlist/api/salebooks/getbooksaleList            - GetList 


## Installing setup
- we need to run api-gateway
- need to import postman collection in postman for Api Routing (easy to use)

## Package (Main Package)
- for code test (Mocha)
- express 
- passport for (Authentication)
- mysql for (Database)
- sequelize for (ORM)
