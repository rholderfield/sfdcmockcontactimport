const faker = require('faker');
const jsforce = require('jsforce');
faker.locale = ('en_US');

let howMany = 1;

let contacts = [];
let createdContactId = [];

function getDay(start, end) {
    let someDay = faker.date.between(start, end);
    let d = new Date(someDay),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function getPastDay() {
    let someDay = faker.date.past(1);
    let d = new Date(someDay),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function createContacts() {
    for (i = 0; i < howMany; i++) {

        let contact = {
            LastName: faker.name.lastName(),
            FirstName: faker.name.firstName(),
            Salutation: faker.random.arrayElement([
                'Mr.',
                'Ms.',
                'Mrs.',
                'Dr.',
                'Prof.'
            ]),
            MailingStreet: faker.address.streetName(),
            MailingCity: faker.address.city(),
            MailingState: faker.address.state(),
            MailingPostalCode: faker.address.zipCode(),
            MailingCountry: 'United States',
            Phone: faker.phone.phoneNumberFormat(),
            MobilePhone: faker.phone.phoneNumberFormat(),
            HomePhone: faker.phone.phoneNumberFormat(),
            Email: faker.internet.email(),
            Title: faker.name.jobTitle(),
            Birthdate: getDay('01/01/1955', '1/01/2002'),
            Level__c: faker.random.arrayElement([
                'Secondary',
                'Tertiary',
                'Primary'
            ]),
            Military_Affiliation__c: faker.random.arrayElement([
                'Active Service Member',
                'Veteran',
                'Reserve/Guard',
                'Military Spouse'
            ]),
            Branch_of_Service__c: faker.random.arrayElement([
                'Air Force',
                'Army',
                'Coast Guard',
                'Marine Corps',
                'Military Spouse',
                'Navy',
                'Space Force'
            ]),
            Personnel_Status__c: faker.random.arrayElement([
                'Enlisted',
                'Military Spouse',
                'Officer'
            ]),
            Separation_Date__c: getPastDay(),
            MOS__c: faker.random.arrayElement([
                "12B",
                "68W",
                "15Q",
                "25U",
                "35P",
                "68A",
                "35F",
                "31K",
                "15N",
                "16A",
                "1A0X1",
                "1N2X1",
                "1P0X1",
                "1W0X1",
                "1Z2X1",
                "2A6X1",
                "2T0X1",
                "AD-6417",
                "8319",
                "8209",
                "8318",
                "0317",
                "0323",
                "0302"
            ]),
            Years_of_Military_Service__c: faker.random.number({ min: 1, max: 30 }),
            Combat_Veteran__c: faker.random.boolean(),
            Disability_Status__c: faker.random.boolean(),
            Gender__c: faker.random.arrayElement([
                'Female',
                'Male',
                'Gender Variant/Non-Conforming',
                'Prefer Not to Answer'
            ]),
            Race_Ethnicity__c: faker.random.arrayElement([
                'American Indian or Alaskan Native',
                'Asian or Pacific Islander',
                'Black or African American',
                'Hispanic American',
                'White or Caucasian',
                'Multiple Ethnicity',
                'Other'
            ]),
            Pronouns__c: faker.random.arrayElement([
                'She/Her/Hers',
                'He/Him/His',
                'They/Them/Theirs',
                'Other'
            ])
        };

        contacts.push(contact);
    }
};

createContacts();


var conn = new jsforce.Connection();
conn.login('', '', function (err, res) {
    if (err) { return console.error(err); }
    conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object

    conn.bulk.load("Contact", "insert", contacts, function (err, rets) {
        if (err) { return console.error(err); }
        for (var i = 0; i < rets.length; i++) {
            if (rets[i].success) {
                createdContactId.push(rets[i].id); 
            } else {
            }
        }
    });
    
});


