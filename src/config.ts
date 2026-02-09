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

export const dogBreeds = [
    { name: "Mixed Breed", value: "mixed" },
    { name: "Unknown", value: "unknown" },
    { name: "Labrador Retriever", value: "labrador" },
    { name: "German Shepherd", value: "german shepherd" },
    { name: "Golden Retriever", value: "golden retriever" },
    { name: "French Bulldog", value: "french bulldog" },
    { name: "Bulldog", value: "bulldog" },
    { name: "Poodle", value: "poodle" },
    { name: "Beagle", value: "beagle" },
    { name: "Rottweiler", value: "rottweiler" },
    { name: "German Shorthaired Pointer", value: "german shorthaired" },
    { name: "Yorkshire Terrier", value: "yorkshire" },
    { name: "Boxer", value: "boxer" },
    { name: "Dachshund", value: "dachshund" },
    { name: "Siberian Husky", value: "husky" },
    { name: "Cavalier King Charles Spaniel", value: "king charles" },
    { name: "Doberman Pinscher", value: "doberman" },
    { name: "Australian Shepherd", value: "australian shepherd" },
    { name: "Miniature Schnauzer", value: "schnauzer" },
    { name: "Shih Tzu", value: "shih tzu" },
    { name: "Boston Terrier", value: "boston terrier" },
    { name: "Pomeranian", value: "pomeranian" },
    { name: "Havanese", value: "havanese" },
    { name: "Shetland Sheepdog", value: "shetland" },
    { name: "Bernese Mountain Dog", value: "bernese" },
    { name: "Great Dane", value: "great dane" },
    { name: "Pembroke Welsh Corgi", value: "corgi" },
    { name: "Chihuahua", value: "chihuahua" },
    { name: "Border Collie", value: "border collie" },
    { name: "Cocker Spaniel", value: "cocker" },
    { name: "Pug", value: "pug" },
    { name: "Mastiff", value: "mastiff" },
    { name: "Canary Mastiff", value: "canary mastiff" },
    { name: "Maltese", value: "maltese" },
    { name: "Shiba Inu", value: "shiba inu" },
    { name: "English Springer Spaniel", value: "english springer" },
    { name: "English Setter", value: "irish setter" },
    { name: "Irish Setter", value: "irish setter" },
    { name: "Brittany", value: "brittany" },
    { name: "Cane Corso", value: "cane corso" },
    { name: "Weimaraner", value: "weimaraner" },
    { name: "Vizsla", value: "vizsla" },
    { name: "Akita", value: "akita" },
    { name: "Bichon Frise", value: "bichon" },
    { name: "Collie", value: "collie" },
    { name: "Basset Hound", value: "basset" },
    { name: "Newfoundland", value: "newfoundland" },
    { name: "Jack Russell Terrier", value: "jack russell" },
    { name: "Staffordshire Bull Terrier", value: "staffie" },
    { name: "American Staffordshire Terrier", value: "amstaff" },
    { name: "Pit Bull Terrier", value: "pitbull" },
    { name: "Samoyed", value: "samoyed" },
];

export const catBreeds = [
    { name: "Mixed Breed", value: "mixed" },
    { name: "Unknown", value: "unknown" },
    { name: "Domestic Shorthair", value: "domestic shorthair" },
    { name: "Domestic Longhair", value: "domestic longhair" },
    { name: "Siamese", value: "siamese" },
    { name: "Maine Coon", value: "maine coon" },
    { name: "Persian", value: "persian" },
    { name: "Ragdoll", value: "ragdoll" },
    { name: "British Shorthair", value: "british shorthair" },
    { name: "Bengal", value: "bengal" },
    { name: "Abyssinian", value: "abyssinian" },
    { name: "Birman", value: "birman" },
    { name: "Oriental Shorthair", value: "oriental shorthair" },
    { name: "Sphynx", value: "sphynx" },
    { name: "Devon Rex", value: "devon rex" },
    { name: "Russian Blue", value: "russian blue" },
    { name: "Scottish Fold", value: "scottish fold" },
    { name: "Norwegian Forest Cat", value: "norwegian forest cat" },
];

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
        dogOptions: dogBreeds,
        catOptions: catBreeds
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
        label: "status",
        id: "adopted_at",
        input_type_1: "checkbox",
        input_type_2: "date",
        checkbox_label: "adopted?",
        date_aria_label: "set adoption date"
    },
}

export const tableColumns = [
    animalFields.name.db_key,
    animalFields.type.db_key,
    animalFields.breed.db_key,
    animalFields.sex.db_key,
    animalFields.age.db_key,
    animalFields.size.db_key,
    animalFields.location.db_key,
    animalFields.adoption_date.db_key
];

export const eventFields = {
    title: {
        db_key: "title",
        label: "Title",
        id: "title",
        input_type: "text",
    },
    type: {
        db_key: "event_type",
        label: "Type",
        id: "type",
        options: [
            {
                name: "Vet appointment",
                value: "vet appointment"
            },
            {
                name: "Adoption visit",
                value: "adoption visit"
            },
            {
                name: "Food recollection",
                value: "food recollection"
            },
            {
                name: "Other (specify in description)",
                value: "other"
            }
        ]
    },
    start_date: {
        db_key: "start",
        label: "Start date and time",
        id: "start",
        input_type: "datetime-local",
    },
    end_date: {
        db_key: "end",
        label: "End date and time",
        id: "end",
        input_type: "datetime-local",
    },
    organizer: {
        db_key: "organizer",
        label: "organizer",
        id: "organizer",
        input_type: "text",
    },
    location: {
        db_key: "location",
        label: "Location",
        id: "location",
        input_type: "text",
    },
    visitor_name: {
        db_key: "visitor_name",
        label: "Visitor name",
        id: "visitor_name",
        input_type: "text"
    },
    visitor_phone: {
        db_key: "visitor_phone",
        label: "Visitor phone",
        id: "visitor_phone",
        input_type: "tel"
    },
    visitor_email: {
        db_key: "visitor_email",
        label: "Visitor email",
        id: "visitor_email",
        input_type: "email"
    }
}