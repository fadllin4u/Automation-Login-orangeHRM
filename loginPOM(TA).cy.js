import loginPage from "../../pom/orangeHRM/Login/login";

describe('Login Feature',() => {

  it('User Login with Valid credentials', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      loginPage.textLogin().should('have.text','Login');
      loginPage.inputUsername().type('Admin'); // Username yang benar
      loginPage.inputPassword().type('admin123'); //Password yang benar
      cy.intercept("GET","**/employees/action-summary").as("actionSummary");
      loginPage.buttonLogin().click();
      cy.wait('@actionSummary').then((intercept)=>{
          expect(intercept.response.statusCode).to.equal(200)}
      );
      loginPage.menuDashboard().should('have.text','Dashboard')
  });
  it('User Login dengan Username yang salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('be.visible');
    loginPage.inputUsername().type('admin123');  // Username yang salah
    loginPage.inputPassword().type('admin123');  // Password yang benar
    cy.intercept("GET","**/i18n/messages").as("messages");
    loginPage.buttonLogin().click();
    cy.wait('@messages').then((intercept)=>{
      expect(intercept.response.statusCode).to.equal(304)}
    );
      loginPage.invalidcredentials().should('have.text','Invalid credentials');
  });
  it('User Login dengan Password yang salah', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      loginPage.textLogin().should('be.visible');
      loginPage.inputUsername().type('Admin');  // Username yang benar
      loginPage.inputPassword().type('wrong password');  // Password yang salah
      cy.intercept("GET","**/i18n/messages").as("messages");
      loginPage.buttonLogin().click();
      cy.wait('@messages').then((intercept)=>{
        expect(intercept.response.statusCode).to.equal(304)}
      );
        loginPage.invalidcredentials().should('have.text','Invalid credentials'); 
  });
  it('User Login tanpa memasukkan username and password', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    loginPage.textLogin().should('be.visible');
    loginPage.inputUsername(); // Biarkan kolom username kosong
    loginPage.inputPassword(); // Biarkan kolom password kosong
    loginPage.buttonLogin().click();
    loginPage.required().should('have.text','RequiredRequired');
  });
  describe('Forgot Your Password Feature', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
  
    it('User berhasil reset password dengan username benar', () => {
      loginPage.forgotyourPassword().should('be.visible');
      loginPage.forgotyourPassword().click();
      loginPage.url().should('include', '/requestPasswordResetCode'); 
      loginPage.h6().should('contain.text', 'Reset Password');
      loginPage.inputUsername().type('Admin');
      cy.intercept("POST", "**/auth/requestResetPassword").as("requestResetPassword");
      loginPage.buttonforgotPassword().click();
      cy.wait('@requestResetPassword').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(302);
      });
      loginPage.messages().should('have.text', 'Reset Password link sent successfully');
    });
  
    it('User berhasil reset password dengan username berbeda', () => {
      loginPage.forgotyourPassword().should('be.visible');
      loginPage.forgotyourPassword().click();
      loginPage.url().should('include', '/requestPasswordResetCode'); 
      loginPage.h6().should('contain.text', 'Reset Password'); 
      loginPage.inputUsername().type('user123');
      cy.intercept("POST", "**/auth/requestResetPassword").as("requestResetPassword");
      loginPage.buttonforgotPassword().click();
      cy.wait('@requestResetPassword').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(302);
      });
      loginPage.messages().should('have.text', 'Reset Password link sent successfully');
    });
  
    // Test case baru: User mencoba reset password dengan username yang tidak valid
    it('User gagal reset password tanpa mengisi username', () => {
      loginPage.forgotyourPassword().should('be.visible');
      loginPage.forgotyourPassword().click();
      loginPage.url().should('include', '/requestPasswordResetCode'); 
      loginPage.h6().should('contain.text', 'Reset Password'); 
    
      // Tidak mengisi username
      loginPage.inputUsername().should('be.empty'); // Pastikan input kosong
      cy.intercept("POST", "**/auth/requestResetPassword").as("requestResetPassword");
      loginPage.buttonforgotPassword().click();
    });
  });
  })