const faker = require('faker');
const jsforce = require('jsforce');

faker.locale = ('en_US');

let howMany = 1;

let createdContactId = [];

let salarySurveys = [];

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


function createSurveyResponse() {
    for (i = 0; i < howMany; i++) {
        let salarySurvey = {
            Variable_Pay__c: faker.random.number({ min: 1, max: 500000 }),
            Annual_Base_Salary__c: faker.random.number({ min: 1, max: 500000 }),
            Job_Type__c: faker.random.arrayElement([
                'Full-time (40+ hours/week)',
                'Part-time (20+ hours/week)'
            ]),
            Sign_on_Bonus__c: faker.random.number({ min: 1, max: 50000 }),
            Stock_Options_RSUs__c: faker.random.number({ min: 1, max: 100000 }),
            Annual_Profit_Sharing__c: faker.random.number({ min: 1, max: 100000 }),
            City__c: faker.address.city(),
            State__c: faker.random.arrayElement([
                'Alabama - AL',
                'Alaska - AK',
                'Arizona - AZ',
                'Arkansas - AR',
                'California - CA',
                'Colorado - CO',
                'Connecticut - CT',
                'Delaware - DE',
                'District of Columbia - DC',
                'Florida - FL',
                'Georgia - GA',
                'Hawaii - HI',
                'Idaho - ID',
                'Illinois - IL',
                'Indiana - IN',
                'Iowa - IA',
                'Kansas - KS',
                'Kentucky - KY',
                'Louisiana - LA',
                'Maine - ME',
                'Maryland - MD',
                'Massachusetts - MA',
                'Michigan - MI',
                'Minnesota - MN',
                'Mississippi - MS',
                'Missouri - MO',
                'Montana - MT',
                'Nebraska - NE',
                'Nevada - NV',
                'New Hampshire - NH',
                'New Jersey - NJ',
                'New Mexico - NM',
                'New York - NY',
                'North Carolina - NC',
                'North Dakota - ND',
                'Ohio - OH',
                'Oklahoma - OK',
                'Oregon - OR',
                'Pennsylvania - PA',
                'Rhode Island - RI',
                'South Carolina - SC',
                'South Dakota - SD',
                'Tennessee - TN',
                'Texas - TX',
                'Utah - UT',
                'Vermont - VT',
                'Virginia - VA',
                'Washington - WA',
                'West Virginia - WV',
                'Wisconsin - WI',
                'Wyoming - WY'
            ]),
            Zip_Code__c: faker.address.zipCode(),
            Other_Benefits__c: faker.random.arrayElement([
                'Medical',
                'Dental',
                'Vision/Optical',
                '401(k) Retirement Savings Plan',
                'Flex Hours',
                'Work From Home (WFH)',
                'Paid Sick Leave',
                'Life Insurance/Disability',
                'Paid Holidays/Vacation',
                'Social Security',
                'Pension',
                'Personal Time Off (PTO)',
                'Profit Share',
                'Certification Allowance',
                'Education/training allowance',
                'Attend industry events',
                'Home-office stipend',
                'Company laptop',
                'Cell phone allowance',
                'Charity/volunteer days',
                'Free parking',
                'Free food and drink',
                'Pet-friendly office',
                'Home Office / Co-Office Stipend',
                'Gym Membership',
                'None',
                'Other'
            ]),
            Paid_Vacation__c: faker.random.number({ min: 1, max: 10 }),
            Certifications__c: faker.random.arrayElement([
                'Other',
                'Salesforce Certified Administrator',
                'Salesforce Certified Advanced Administrator',
                'Salesforce Certified Application Architect',
                'Salesforce Certified Community (Experience) Cloud Consultant',
                'Salesforce Certified CPQ Specialist',
                'Salesforce Certified Data Architecture & Management',
                'Salesforce Certified Development Lifecycle & Deployment',
                'Salesforce Certified Identity and Access Management Designer',
                'Salesforce Certified Integration Architecture',
                'Salesforce Certified Marketing Cloud Email Specialist',
                'Salesforce Certified Pardot Specialist',
                'Salesforce Certified Platform App Builder',
                'Salesforce Certified Platform Developer I',
                'Salesforce Certified Platform Developer II',
                'Salesforce Certified Sales Cloud Consultant',
                'Salesforce Certified Service Cloud Consultant',
                'Salesforce Certified Sharing and Visibility Designer'
            ]),
            Education_Level__c: faker.random.arrayElement([
                'High School Diploma',
                'Some college Credit-No degree',
                'Trade/Technical/Vocational Qualification',
                'Associate\'s Degree\, Bachelor\'s Degree',
                'Master\'s Degree or MBA',
                'Doctoral Degree JD\, MD\, PhD or Equivalent',
                'Prefer not to specify'
            ]),
            Age_Range__c: faker.random.arrayElement([
                '18-24 years old',
                '25-34 years old',
                '35-44 years old',
                '45-54 years old',
                '55+ years old',
                'Prefer not to specify'
            ]),
            Company_Name__c: faker.company.companyName('20'),
            Diversity_Policy__c: faker.random.arrayElement([
                'Yes',
                'No',
                'Not sure'
            ]),
            Veteran_Alliance__c: faker.random.arrayElement([
                'Yes',
                'No',
                'Not sure'
            ]),
            Organization_size__c: faker.random.arrayElement([
                '1-10 employees',
                '11-20 employees',
                '21-50 employees',
                '51-100 employees',
                '101-500 employees',
                '501-1000 employees',
                '1001-5000 Employees',
                '5001-10000 Employees',
                'Over 10000 Employees',
                'Not sure'
            ]),
            Employment_Type__c: faker.random.arrayElement([
                'Permanent Full-Time',
                'Permanent Part-Time',
                'Freelance Contract',
                'Volunteer'
            ]),
            Role__c: faker.random.arrayElement([
                'Administrator',
                'Business Analyst',
                'Developer\, Consultant',
                'Architect\, Product Owner',
                'Project Manager\, Marketing',
                'Sales\, Service',
                'Partner',
                'Customer',
                'Executive Director',
                'Manager',
                'Supervisor',
                'Master Thought Leader',
                'Master Strategic Role',
                'Other'
            ]),
            Salesforce_Experience__c: faker.random.number({ min: 1, max: 20 }),
            Direct_Reports__c: faker.random.arrayElement([
                '0',
                '1-5',
                '6-10',
                '11-25',
                '26-100',
                '100+'
            ]),
            Reports_To__c: faker.random.arrayElement([
                'Supervisor',
                'Manager',
                'Director',
                'Senior/Top Management',
                'CEO/Board of Directors',
                'Other'
            ]),
            WFH__c: faker.random.arrayElement([
                'Never',
                '1-day a week',
                '2-days a week',
                '3-days a week',
                '4-days a week',
                'Full Time Remote work'
            ]),
            Tenure__c: faker.random.number({ min: 1, max: 20 }),
            Seniority__c: faker.random.arrayElement([
                'Junior',
                'Associate',
                'Standard',
                'Senior',
                'Principal'
            ]),
            Beyond_Office_Hours__c: faker.random.arrayElement([
                'Never',
                'Rarely',
                'Sometimes',
                'Usually',
                'Always',
                'Other'
            ]),
            Firm_Type__c: faker.random.arrayElement([
                'Government',
                'Corporate',
                'Non-Profit',
                'Salesforce Partner',
                'Salesforce Consultancy',
                'Other'
            ]),
            Pay_Type__c: faker.random.arrayElement([
                'Annual Salary',
                'Hourly Rate',
                'Pro Bono / Volunteer Rate'
            ]),
            Veteran_Resource__c: faker.random.arrayElement([
                'Yes',
                'No',
                'Not sure'
            ]),
            Equal_Pay_Policy__c: faker.random.arrayElement([
                'Yes',
                'No',
                'Not sure'
            ]),
            Equal_Rights__c: faker.random.arrayElement([
                'Yes, my employer champions equal working rights',
                'No, I believe more could be done',
                'Not sure'
            ]),
            Disability_Inclusion__c: faker.random.arrayElement([
                'Yes',
                'No',
                'Not sure'
            ]),
            Senior_Executive_Equality__c: faker.random.arrayElement([
                'Yes',
                'No',
                'Not sure'
            ]),
            Suggestions_Diversity__c: faker.lorem.sentence(),
            Suggestions_Inclusion__c: faker.lorem.sentence(),
            Contact__c: createdContactId.pop()
        };
        salarySurveys.push(salarySurvey);
    }

}

createSurveyResponse();

var conn = new jsforce.Connection();
conn.login('', '', function (err, res) {
    if (err) { return console.error(err); }
    conn.bulk.pollTimeout = 25000; // Bulk timeout can be specified globally on the connection object
    conn.bulk.load("Salary_Survey__c", "insert", salarySurveys, function (err, rets) {
        if (err) { return console.error(err); }
        for (var i = 0; i < rets.length; i++) {
            if (rets[i].success) {
                console.log("#" + (i + 1) + " loaded successfully, id = " + rets[i].id);
            } else {
                console.log("#" + (i + 1) + " error occurred, message = " + rets[i].errors.join(', '));
            }
        }
    });
});