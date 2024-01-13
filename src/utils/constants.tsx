const defaultCode = `[
    "{{for(5)}}",
    {
        "id": "{{uuid()}}",
        "name": "{{firstName()}} {{lastName()}}",
        "age": "{{age()}}",
        "gender": "{{gender()}}",
        "email": "{{email()}}",
        "isActive": "{{boolean()}}"
    }
]
`;

export { defaultCode };
