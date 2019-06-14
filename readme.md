MidPint
Lets two users fill in their addresses and the app will select a highly rated bar in Amsterdam that is at the midpoint of their locations.

Answer the following questions:

- What is the problem you are trying to solve?

My friend and I live on opposite sides of town. If we decide to hang out at one of our places, one of us will have to man up and make the 40 minute bike ride. Sometimes however, we are lazy and decide to meet each other halfway and have drinks in a bar. In this case, we are lazy and often are not able to decide on a bar. This is where MidPint (working title) comes in: it selects a highly rated bar right in the middle of you and your friend’s place, combining convenience with an element of surprise.

- Who is your target audience?

People living in the city that like to go out, and are open to a bit of adventure in surprising themselves with a bar to meet up. It will also be of use for people that are new to the city and want to meet up with new friends. They are often not up to date with the best bars in town and when they want to meet up with friends, this will help them with picking a bar and getting to know the city.

- What are your specific goals?

Creating a slick, simple and functional application, no fuss but just a straight up way to select a bar to hangout in, providing you with the exact amount of information you need – nothing more!

- In another block, answer the following:

- What is your business model? Where is your revenue coming from?
As the users of this application consist of people who want to go somewhere for drinks, it would be a good place for bars to advertise, for example in a separate, blog-like page that highlights a “bar of the week” – as sponsored content. Another possibility could be to sell it to a bigger application such as Tinder – where it adds a functionality for users that want to go on a date together.

- What are the costs of your business?
For now, the most important costs will be for it to run on a server and the domain.

Market research:

- Who is your current competition?

There is not really another app that does what MidPint does. Something that comes kind of close however is Bar Roulette, which picks a bar for you and gets you a uber ride there. However, the iOS app is only available in the U.S. and its web application is not functioning. Besides Bar Roulette, competitors would be apps for finding bars in general – such as Your Little Black Book or other city-guide type of applications, or even services like Google Maps, which can be used for finding bars as well based on your location.

- How is your product different from currently available competitors?

What is different with this app is that it is an answer to a specific problem: wanting to meet up for drinks at a central location relative to you and your friends’ locations, something that apps for finding the hotspots in town or even Google Maps can be used for as well. Additionally, similar to Bar Roulette, it has a surprise element to it, as it selects a bar for you: giving it a spontaneous and adventurous feel. However, the combination of the two is what sets it apart. It is an accessible and straight-forward application. Where with Bar Roulette, you have to get an Uber ride, MidPint is free to use and does not require you to pay for an Uber ride. Also, it is more specific to biking-culture: in Amsterdam, people are less likely to take an Uber to meet someone for drinks, as they are more likely to move around by bike (and not by car for example, which in combination with going for drinks is illegal). Also, the problem that this application responds to is more bike-specific: Amsterdam may not be that big, but 30-40 minutes by bike can be quite a lot.
This app is a solution because it makes sure that its users will meet somewhere in the middle, and selects a hot bar in town, making them familiar with some of the hotspots even in neighbourhoods they are less familiar with.

- What is the current supply / demand for your product?

There could definitely be a demand for this product. People like to go out for drinks and people also like to be surprised. For example, there is this Dutch website called srprs.me where you can book a surprise holiday, which is something that me and many people I know have actually done. MidPint is a more accessible and smaller way to integrate such an element of surprise into your day to day life. Also, from personal experience, I have noticed that many friends struggle with picking a bar to hangout in especially when living on different sides of town. There is not really a supply of this specific product yet (as discussed above).

Technical Specifications:

- What data will you need to store? How will it be organized? Describe each table, its columns, and its relationships with other tables.

For now, the app will not really be storing any data, as everything happens server-side. This might change when I decide to expand the application to also include the possibility for having users sign up and for example save and share the bars that they have been to.

- What does your product look like? List each view, their purpose, and how they work

It looks simplistic and slick: form supporting function. It does what it needs to do, no bells and whistles.
The homepage is centred around the input form for the addresses.
The results page is centred around showing the sufficient amount of information for the user to get an idea of the bar’s vibe, price range, and where it is located.

- Describe any complex business logic that is happening in your application. For example, how does data flow through your application

The user inputs two addresses (might be more when I decide to expand the application). These addresses will be strings, that will be put in a query that is sent to the MapBox API. MapBox will return the longitude and latitude coordinates for these specific addresses (in GeoJSON format). Then, these coordinates will be combined in determining their midpoint: the Turf package takes in these coordinates and returns the longitude and latitude coordinates for the midpoint. This geographical data will then be put in a query that is sent to the Yelp API, where the highest rated bar within a certain radius of that midpoint is selected - a bar that is also opened during the time of the query. The data here is then filtered for specific information (the bar’s name, address, an image, its price range and a link to the Yelp page for that specific bar) and printed on the results page.

Have a timeline of milestones to reach, including deadlines, - Create milestones that represent the discrete blocks of functionality, and - Give an estimate for how long each will take to engineer.

Think of a project: 1 day
Scaffold project and create basic code, middleware, and packages : 0.5 day
Figure out how to read from MapBox API and how GeoCoding works: 1 day
Link forms to MapBox API so strings are translated into GeoJson: 1 day
Calculate center using Turf: 1.5 day
Use center coordinates to read from Yelp API (and get specific info back): 2 days
Create template engine pages: 1.5 days
Modularize project: 0.5 day
Style the project: 2.5 days

- Determine whether things can be built concurrently.

Not really, as my app is really built around the passing of data from a form through several API’s and calculations. It is a step by step thing so it has to be done in order. The styling and lay-out of the pages can be done concurrently, however, I prefer to do it once the back-end works and I know exactly what information I want them to display.

- Come up with a timeline of goals to stick to.

Thursday 6th: Data can be passed in the form, is translated into GeoJson through MapBox API and the center location can be calculated via TurfJs
Monday 10th: Yelp API is working
Wednesday 12th: Template Engines are done
Friday 14th: Code is modularized and styling of the website is done
Sunday 16th : Finishing touch, final checks and submitting assignment
