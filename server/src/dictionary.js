var request = require("request");
var cheerio = require("cheerio");
var _ = require('underscore');

module.exports = {
  titles: {
    objective: ['objective', 'objectives','responsibilities'],
    summary: ['summary', 'overview','about','professional' ],
    experience:['work','experience'],
    
    //PersonalDetails:['personal details', 'personal profile', 'business analyst','personal information'],
    education: ['education', 'qualifications'],
    skills: ['skills','skillset','skill','technologies','languages','expertise','skilfulness','ability','mastery' ],
    languages: ['languages'],
    courses: ['courses'],
    projects: ['projects', 'project title'],
    links: ['links'],
    contacts: ['contacts'],
    positions: ['positions', 'position'],
    profiles: ['profiles', 'social'],
    awards: ['awards'],
    honors: ['honors'],
    additional: ['additional'],
    certification: ['certification', 'certifications'],
    interests: ['interests', 'hobbies'],
    strength: ['strength', 'strengths', 'postive points'],
    weekness: ['areas of improvements', 'weekness'],
    birthdate: ['birth','dob','D.O.B','date of birth','Birth of date'],
    gender: ['gender','Sex'],
    address: ['address', 'city', 'country','location','place'],
    designation: ['designation'],
    cuurentsalary: ['salary'],
    nationality: ['nationality','citizenship'],
    fathername: ["father's Name", "father's Name"]
  },
 

  profiles: [
    ['github.com', function(url, Resume, profilesWatcher) {
      download(url, function(data, err) {
        if (data) {
          var $ = cheerio.load(data),
            fullName = $('.vcard-fullname').text(),
            location = $('.octicon-location').parent().text(),
            mail = $('.octicon-mail').parent().text(),
            link = $('.octicon-link').parent().text(),
            clock = $('.octicon-clock').parent().text(),
            company = $('.octicon-organization').parent().text();

          Resume.addObject('github', {
            name: fullName,
            location: location,
            email: mail,
            link: link,
            joined: clock,
            company: company
          });
        } else {
          return console.log(err);
        }
        //profilesInProgress--;
        profilesWatcher.inProgress--;
      });
    }],
    ['linkedin.com', function(url, Resume, profilesWatcher) {
      download(url, function(data, err) {
        if (data) {
          var $ = cheerio.load(data),
            linkedData = {
              positions: {
                past: [],
                current: {}
              },
              languages: [],
              skills: [],
              educations: [],
              volunteering: [],
              volunteeringOpportunities: []
            },
            $pastPositions = $('.past-position'),
            $currentPosition = $('.current-position'),
            $languages = $('#languages-view .section-item > h4 > span'),
            $skills = $('.skills-section .skill-pill .endorse-item-name-text'),
            $educations = $('.education'),
            $volunteeringListing = $('ul.volunteering-listing > li'),
            $volunteeringOpportunities = $('ul.volunteering-opportunities > li');

          linkedData.summary = $('#summary-item .summary').text();
          linkedData.name = $('.full-name').text();
          // current position
          linkedData.positions.current = {
            title: $currentPosition.find('header > h4').text(),
            company: $currentPosition.find('header > h5').text(),
            description: $currentPosition.find('p.description').text(),
            period: $currentPosition.find('.experience-date-locale').text()
          };
          // past positions
          _.forEach($pastPositions, function(pastPosition) {
            var $pastPosition = $(pastPosition);
            linkedData.positions.past.push({
              title: $pastPosition.find('header > h4').text(),
              company: $pastPosition.find('header > h5').text(),
              description: $pastPosition.find('p.description').text(),
              period: $pastPosition.find('.experience-date-locale').text()
            });
          });
          _.forEach($languages, function(language) {
            linkedData.languages.push($(language).text());
          });
          _.forEach($skills, function(skill) {
            linkedData.skills.push($(skill).text());
          });
          _.forEach($educations, function(education) {
            var $education = $(education);
            linkedData.educations.push({
              title: $education.find('header > h4').text(),
              major: $education.find('header > h5').text(),
              date: $education.find('.education-date').text()
            });
          });
          _.forEach($volunteeringListing, function(volunteering) {
            linkedData.volunteering.push($(volunteering).text());
          });
          _.forEach($volunteeringOpportunities, function(volunteering) {
            linkedData.volunteeringOpportunities.push($(volunteering).text());
          });

          Resume.addObject('linkedin', linkedData);
        } else {
          return console.log(err);
        }
        profilesWatcher.inProgress--;
      });
    }],
    'facebook.com',
    'bitbucket.org',
    'stackoverflow.com'
  ],
  inline: {
    birthdate: "\\n([\s\S]*[^\\n])*\\n",
    gender: "([\s\S]*[^\\n])*\\n",
    cuurentsalary:"([\s\S][^\\n])*\\n",
    nationality:"([\s\S][^\\n])*\\n",
    address:"([\s\S][^\\n])*\\n"
  },
  regular: {
    name: [
      /([A-Za-z]*) ([A-Za-z]*)/
    ],
    email: [
      /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/
    ],
    phone: [
      /(\d{3})(\d{3})(\d{4})/g
    ],
    mobile: [
      /(\d{3})-(\d{3})-(\d{4})/g
    ]
  }
};

// helper method
function download(url, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    } else {
      callback(null, error)
    }
  });
}