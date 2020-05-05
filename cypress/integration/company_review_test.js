describe('Navs to company review form.', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });
  it('should navigate to add review after logging in the submit a review', function () {
    // select element and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('[data-cy=loginSubmit]').as('loginSubmit');
    // interact with element
    cy.get('@emailText').type('testing123@gmail.com');
    cy.get('@passwordText').type('12345678');
    cy.get('@loginSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
    // nav to add review start
    cy.get('[data-cy=addReviewButton]').as('addReviewButton');

    cy.wait(500);

    cy.get('@addReviewButton').click();
    cy.url().should('include', 'add-review');
    // click
    cy.get('[data-cy=companyReviewButton]').as('companyReviewButton');
    cy.wait(4500);
    cy.get('@companyReviewButton').click();

    //Successfully fills out the form and submits a new Company Review
    //get the elements and assign alias then type
    cy.wait(3000);
    cy.get('input[name="company_name"]').as('companyNameText');
    cy.get('@companyNameText').type('Google');

    cy.get('select[name="work_status_id"]').as('workStatusDropdown');
    cy.get('@workStatusDropdown').select('Full Time');

    cy.get('input[name="job_title"]').as('jobTitleText');
    cy.get('@jobTitleText').type('Cypress Engineer');

    cy.get('input[name="Company Headquarters"]').as('locationText');
    cy.get('@locationText').type('Atlanta');
    cy.wait(300);
    cy.get('@locationText').type('{downArrow}').type('{enter}');

    cy.get('input[name="start_date"]').as('startDateText');
    cy.get('@startDateText').type('1999');

    cy.get('input[name="end_date"]').as('endDateText');
    cy.get('@endDateText').type('2000');

    cy.get('[data-cy=companyComment]').as('commentText');
    cy.get('@commentText').type('TESTING VIA CYPRESS');

    cy.get('select[name="typical_hours"]').as('hoursDropdown');
    cy.get('@hoursDropdown').select('30 hours+');

    cy.get('input[name="salary"]').as('salaryText');
    cy.get('@salaryText').type('123456');

    cy.get('ul>li').as('companyOverall');
    cy.get('@companyOverall').eq(2).click();

    //submit the form
    cy.get('[data-cy=companyReviewSubmit]').click();
  });
});
