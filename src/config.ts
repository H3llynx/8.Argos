export const ageDescription = [
    {
        name: "Puppy / Kitten (0-1 yr)",
        value: "puppy_kitten"
    },
    {
        name: "Young (1-3 yrs)",
        value: "young"
    }
    ,
    {
        name: "Adult (3-7 yrs)",
        value: "adult"
    }
    ,
    {
        name: "Senior (7+ yrs)",
        value: "senior"
    }
]

export const animalFields = {
    name: {
        field: "name",
        label: "name",
        id: "name",
        input_type: "text",
    },
    type: {
        field: "type",
        id: "type",
        label: "type",
        options: [
            {
                name: "dog",
                value: "dog"
            },
            {
                name: "cat",
                value: "cat"
            }
        ]
    },
    sex: {
        field: "sex",
        id: "sex",
        label: "sex",
        options: [
            {
                name: "male",
                value: "male"
            },
            {
                name: "female",
                value: "female"
            }
        ]
    },
    age: {
        field: "age",
        id: "age",
        label: "age",
        options: ageDescription
    },
    size: {
        field: "size",
        id: "size",
        label: "size",
        options: [
            {
                name: "small",
                value: "small"
            },
            {
                name: "medium",
                value: "medium"
            },
            {
                name: "large",
                value: "large"
            },
        ]
    },
    breed: {
        field: "breed",
        label: "breed",
        id: "breed",
        input_type: "text",
    },
    location: {
        field: "location",
        label: "location",
        id: "location",
        input_type: "text",
    },
    photo: {
        field: "photo_url",
        id: "photo",
        input_type: "file",
    },
    adoption_date: {
        field: "adopted_at",
        id: "adopted_at",
        input_type_1: "checkbox",
        input_type_2: "date",
        checkbox_label: "adopted?",
        date_aria_label: "set adoption date",
        column: "status"
    },
}

export const tableColumns = [
    animalFields.name.field, animalFields.type.field, animalFields.breed.field, animalFields.sex.field, animalFields.age.field, animalFields.size.field, animalFields.location.field, animalFields.adoption_date.column
]