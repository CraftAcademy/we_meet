#require 'faker'

Group.destroy_all
Event.destroy_all
Category.destroy_all

Category.create(name: 'Film')
Category.create(name: 'Music')
Category.create(name: 'Health')
tech = Category.create(name: 'Technology')
Category.create(name: 'Science')
Category.create(name: 'Sports')

craft_academy = Group.create(name: 'Craft Academy', category_id: tech.id)
Group.create(name: 'Ruby on Rails', category_id: tech.id)
Group.create(name: 'CSS', category_id: tech.id)
Group.create(name: 'Front End Fun', category_id: tech.id)
Group.create(name: 'Back End Development', category_id: tech.id)
Group.create(name: 'Agile', category_id: tech.id)

Event.create(title: 'STHLM TECH Meetup', group_id: craft_academy.id)
Event.create(title: 'Coffee n Code', group_id: craft_academy.id)
Event.create(title: 'Scrum Fun', group_id: craft_academy.id)
Event.create(title: 'Techie Treckies', group_id: craft_academy.id)
Event.create(title: 'Hackathon', group_id: craft_academy.id)
Event.create(title: 'Code Party', group_id: craft_academy.id)