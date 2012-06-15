/* jasmine-like end2end tests go here */

describe('SAM POC App', function() {

    describe('Seasons Page', function() {

        beforeEach(function(){
            browser().navigateTo('/app/#/seasons');
            //pause();
        });

        it('Is this a HTML page? (element(\'body\').count() equals 1)', function(){
            expect(element('body').count()).toBe(1);
        });

        describe('Season list view', function(){
            it('Should have a title of content "Season Setup"', function(){
                expect(element('div.row div.span9 h3').text()).toMatch('Season Setup');
            });

            it('Should have 1 or more lines on the results table', function(){
                expect(repeater('table.phones tr td').count()).toBeGreaterThan(0);
            });

            //TODO: Make the table rows count work!
            /*
            it('Should have one delete for each table line', function(){
                expect(repeater('a[ng-click="remove(season)"]').count()).toBe($('#showSeason tr').length);
            });
            */
        });

        describe('Header section', function(){
            it('Company dropdown should have 4 options', function() {
                expect(repeater('#companyFilter option').count()).toBe(4);
            });

            it('Dropdown should change the table listing', function(){
                var tableSize = element('#showSeason tr').size()
                select('#companyFilter').option(1);
                expect();//TODO:finish writing
            });

            it('Should have an Add button', function(){
                expect(element('button').text()).toMatch('Add');
            });

            it('Add button should send me to the "Add Page"', function() {
                element('button#addSeason').click();
                expect(browser().window().hash()).toBe('/seasons/new');
            });
        })
    });

    describe('Seasons Add Page', function() {

        beforeEach(function(){
            //browser().navigateTo('/#/seasons');
            browser().navigateTo('/app/#/seasons/new');

        });

        it('Is this a HTML page? (element(\'body\').count() equals 1)', function(){
            expect(element('body').count()).toBe(1);
        });


        describe('Fields', function(){
            describe('Id', function(){
                it('Is type of text?', function(){
                    expect(element('#seasonId').attr("type")).toBe('text');
                });

                it('Can I input text?', function(){
                    input('season._id').enter('12345');
                    expect(element('#seasonId').attr("value")).toBe('12345');
                });
            });

            describe('Season Assortment', function(){
                it('Is type of text?', function(){
                    expect(element('#seasonAssortment').attr("type")).toBe('text');
                });

                it('Can I input text?', function(){
                    input('season.FRCH_SEAS_NM').enter('12345');
                    expect(element('#seasonAssortment').attr("value")).toBe('12345');
                });
            });

            describe('Season Corp', function(){
                it('Is type of text?', function(){
                    expect(element('#seasonCorp').attr("type")).toBe('text');
                });

                it('Can I input text?', function(){
                    input('season.CORP_ID').enter('12345');
                    expect(element('#seasonCorp').attr("value")).toBe('12345');
                });
            });

            describe('Season order start date', function(){
                it('Is type of text?', function(){
                    expect(element('#seasonOrderDate').attr("type")).toBe('text');
                });

                it('Can I input text?', function(){
                    input('season.ORD_PERD_STRT_DT').enter('12345');
                    expect(element('#seasonOrderDate').attr("value")).toBe('12345');
                });
            });

            describe('Season order end date', function(){
                it('Is type of text?', function(){
                    expect(element('#seasonOrderEndDate').attr("type")).toBe('text');
                });

                it('Can I input text?', function(){
                    input('season.ORD_PERD_END_DT').enter('12345');
                    expect(element('#seasonOrderEndDate').attr("value")).toBe('12345');
                });
            });
        });

        describe('Buttons', function(){

            describe('Cancel button', function(){
                it('Title should be "Cancel"', function(){
                    expect(element('button').text()).toMatch('Cancel');
                });

                it('If clicked this should take me to /seasons page', function(){
                    element('button[ng-click="cancel()"]').click();
                    expect(browser().window().hash()).toBe('/seasons');
                });
            });

            describe('Save button', function(){
                it('Title should be "Save"', function(){
                    expect(element('button').text()).toMatch('Save');
                });

                it('If clicked this should NOT take me to /seasons page', function(){
                    element('button[ng-click="save()"]').click();
                    expect(browser().window().hash()).not().toBe('/seasons');
                });

                it('If clicked with completed form this should take me to /seasons page', function(){


                    element('button[ng-click="save()"]').click();
                    expect(browser().window().hash()).toBe('/seasons');
                });
            });


            it('Should have a Save button', function(){
                expect(element('button').text()).toMatch('Save');
            });
        });
    });
});


/*
describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/phones', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().hash()).toBe('/phones');
  });


  describe('Phone list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/phones');
    });


    it('should filter the phone list as user types into the search box', function() {
      expect(repeater('.phones li').count()).toBe(20);

      input('query').enter('nexus');
      expect(repeater('.phones li').count()).toBe(1);

      input('query').enter('motorola');
      expect(repeater('.phones li').count()).toBe(8);
    });


    it('should be possible to control phone order via the drop down select box', function() {
      input('query').enter('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(repeater('.phones li', 'Phone List').column('a')).
          toEqual(["Motorola XOOM\u2122 with Wi-Fi",
                   "MOTOROLA XOOM\u2122"]);

      select('orderProp').option('alphabetical');

      expect(repeater('.phones li', 'Phone List').column('a')).
          toEqual(["MOTOROLA XOOM\u2122",
                   "Motorola XOOM\u2122 with Wi-Fi"]);
    });


    it('should render phone specific links', function() {
      input('query').enter('nexus');
      element('.phones li a').click();
      expect(browser().location().hash()).toBe('/phones/nexus-s');
    });
  });


  describe('Phone detail view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/phones/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(binding('phone.name')).toBe('Nexus S');
    });


    it('should display the first phone image as the main phone image', function() {
      expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.0.jpg');
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element('.phone-thumbs li:nth-child(3) img').click();
      expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.2.jpg');

      element('.phone-thumbs li:nth-child(1) img').click();
      expect(element('img.phone').attr('src')).toBe('img/phones/nexus-s.0.jpg');
    });
  });
});
*/