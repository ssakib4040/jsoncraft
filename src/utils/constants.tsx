const defaultCode = `[
    "{{for(5)}}",
    {
        "id": "{{uuid()}}",
        "name": "{{firstName()}} {{lastName()}}",
        "username": "{{username()}}",
        "age": "{{age()}}",
        "gender": "{{gender()}}",
        "email": "{{email()}}",
        "phone": "{{phone()}}",
        "image": "{{profileImage()}}",
        "password": "{{password()}}",
        "isActive": "{{boolean()}}"
    }
]

`;

export { defaultCode };
