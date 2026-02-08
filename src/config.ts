
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
        db_key: "name",
        label: "Name",
        id: "name",
        input_type: "text",
    },
    type: {
        db_key: "type",
        id: "type",
        label: "Type",
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
        db_key: "sex",
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
        db_key: "age",
        id: "age",
        label: "Age",
        options: ageDescription
    },
    size: {
        db_key: "size",
        id: "size",
        label: "Size",
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
        db_key: "breed",
        label: "Breed",
        id: "breed",
        input_type: "text",
    },
    location: {
        db_key: "location",
        label: "Location",
        id: "location",
        input_type: "text",
    },
    photo: {
        db_key: "photo_url",
        id: "photo",
        input_type: "file",
    },
    adoption_date: {
        db_key: "adopted_at",
        id: "adopted_at",
        input_type_1: "checkbox",
        input_type_2: "date",
        checkbox_label: "adopted?",
        date_aria_label: "set adoption date",
        column: "status"
    },
}

export const tableColumns = [
    animalFields.name.label, animalFields.type.label, animalFields.breed.label, animalFields.sex.label, animalFields.age.label, animalFields.size.label, animalFields.location.label, animalFields.adoption_date.column
]