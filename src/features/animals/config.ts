export const formFields = {
    name: {
        label: "name",
        id: "name",
        input_type: "text",
    },
    type: {
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
        label: "age",
        options: [
            {
                description: "Puppy / Kitten (0-1 yr)",
                value: "puppy_kitten"
            },
            {
                description: "Young (1-3 yrs)",
                value: "young"
            }
            ,
            {
                description: "Adult (3-7 yrs)",
                value: "adult"
            }
            ,
            {
                description: "Senior (7+ yrs)",
                value: "senior"
            }
        ]
    },
    size: {
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
        label: "breed",
        id: "breed",
        input_type: "text",
    },
    location: {
        label: "location",
        id: "location",
        input_type: "text",
    },
}