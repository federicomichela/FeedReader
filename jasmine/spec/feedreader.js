/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures that a URL is defined for each feeds
         * and that the URL is not empty.
         */
         it('should have url', () => {
             let allFeedUrls = allFeeds.map(feed => feed.url);

             expect(allFeedUrls.every(feed => Boolean(feed))).toBe(true);
         });


        /* Ensures that a name is defined for each feeds
         * and that the URL is not empty.
         */
         it('should have name', () => {
             let allFeedNames = allFeeds.map(feed => feed.name);

             expect(allFeedNames.every(name => Boolean(name))).toBe(true);
         });
    });

    /* Testing the menu functionalities.
     */
    describe('The menu', () => {
        /* Ensure the menu element is hidden by default.
        */
        it('should be hidden by default', () => {
            let menuHidden = document.querySelector('body').classList.contains('menu-hidden');

            expect(menuHidden).toBe(true);
        });

        /* Ensure the menu changes visibility when the menu icon is clicked.
         */
         it('shuld show and hide sidebar menu when menu icon clicked', () => {
            let menuIcon = document.querySelector('.menu-icon-link');
            let body = document.querySelector('body');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(true);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });
    });

    /* Testing inital DOM state */
    describe('Initial Entries', () => {
        /* Ensure that when the loadFeed function is called and completes its
         * work, there is at least a single .entry element within the .feed
         * container.
         */
         let feedEntries = document.querySelectorAll('.feed .entry-link');

         // remove existing feed entries to reset DOM state
         feedEntries.forEach(feed => feed.parentElement.removeChild(feed));

         // reload feeds
         beforeEach(done => loadFeed(0, done));

         it('at least one feed listed after loadFeed execution', () => {
            let newFeedEntries = document.querySelectorAll('.feed .entry-link');

            expect(newFeedEntries.length).not.toBe(0);
         });
     });

    /* Testing Feeds */
    describe('New Feed Selection', () => {
        /* Ensure that when a new feed is loaded
         * by the loadFeed function that the content actually changes
         */
         let firstFeedContent, newFirstFeedContent;

         beforeEach(done => loadFeed(0, () => {
             firstFeedContent = document.querySelector('.feed .entry-link').innerText;

             loadFeed(1, () => {
                 newFirstFeedContent = document.querySelector('.feed .entry-link').innerText;
                 done();
             });
         }));

         it ('verify feed content changes after loadFeed execution', () => {
             expect(newFirstFeedContent).not.toBe(firstFeedContent);
         });
     });
}());
