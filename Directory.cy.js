import DirectoryPage from "../../pom/orangeHRM/Login/DirectoryPOM.cy"

describe('Search Directory Feature',()=>{
  beforeEach(()=>{
      DirectoryPage.accessWebsite()
  });

  // Sukses Langsung ke menu Direktori
  it('Sukses Langsung ke menu Direktori', ()=>{
      DirectoryPage.textLogin().should('have.text','Login');
      DirectoryPage.inputUsername().type('Admin');
      DirectoryPage.inputPassword().type('admin123');
      cy.intercept("GET","**/directory/employees?limit=14&offset=0").as('employees?limit=14&offset=0');
      DirectoryPage.buttonLogin().click();
      DirectoryPage.menuDirectory().click();
      cy.wait('@employees?limit=14&offset=0').then((intercept)=>{
      expect(intercept.response.statusCode).to.equal(200);});
      cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text','Directory');
  });
 
//'Success search Employee with input Location only'
it('Success search Employee with input Location only', ()=>{
  DirectoryPage.textLogin().should('have.text','Login');
  DirectoryPage.inputUsername().type('Admin');
  DirectoryPage.inputPassword().type('admin123');
  DirectoryPage.buttonLogin().click();
  DirectoryPage.menuDirectory().click();
  DirectoryPage.clickLocation();
  DirectoryPage.optionLocation();
  DirectoryPage.selectLocation();
  cy.intercept('GET', '**/directory/employees?limit=14&offset=0&locationId=2').as('directorySearchRequest');
  DirectoryPage.clickSearch();
  cy.wait('@directorySearchRequest').its('response.statusCode').should('eq', 200);
  DirectoryPage.ProfileUser();
});

});