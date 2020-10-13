export interface User {
    id: string;
    photo: string;
    name: string; 
    lastname: string;   
    password: string;
    credit: number;
    address: string;  
    email: string;   
    phonenumber: string;
    notifications: number;
    role: string;
    token: string;
}

export interface New {
   id: string;
   name: string;
   img: string;
   
}

export interface Product{
    id: string;
    img: string;    
    name: string; 
    category: string;  
    categoryName: string;
    price: number;
    amount: number;
        
}

export interface Category{
    id: string;
    name: string,
    description: string,
    img: string      
}


export interface Message {
    content: string;
    sender: string;
    date: number;    
}