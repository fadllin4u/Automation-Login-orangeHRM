describe('Login Feature',() => {
    // User Login with Valid Credentials

it('User Login with Valid credentials', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text', 'Login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.intercept("GET","**/employees/action-summary").as("actionSummary");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
    cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]').should('have.text', 'Dashboard');
});
it('User Login dengan username yang salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('be.visible');
    cy.get('[name="username"]').type('admin123');
    cy.get('[name="password"]').type('admin123');
    cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as("messages");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@messages').its('response.statusCode').should('eq', 304);
    cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');
})
it('User Login dengan password yang salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('be.visible');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('wrong password');
    cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as("messages");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@messages').its('response.statusCode').should('eq', 304);
    cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');  
})
it('User Login tanpa memasukkan username and password', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('be.visible');
  cy.get('[name="username"]'); // Biarkan kolom username kosong
  cy.get('[name="password"]');// Biarkan kolom password kosong
  cy.intercept("GET","**/i18n/messages").as("messages");
  cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
  cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','RequiredRequired');  // Memastikan pesan error tampil
})
it('User Login dengan username kosong dan password benar', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('be.visible');
  cy.get('[name="username"]'); // Biarkan kolom username kosong
  cy.get('[name="password"]').type('admin123');  // password yang benar
  cy.intercept("GET","**/i18n/messages").as("messages");
  cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
  cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');  // Memastikan pesan error tampil
})
it('User Login dengan username benar dan password kosong', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('be.visible');
  cy.get('[name="username"]').type('Admin');  // Username yang benar
  cy.get('[name="password"]'); // Biarkan kolom password kosong
  cy.intercept("GET","**/i18n/messages").as("messages");
  cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
  cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').should('have.text','Required');  // Memastikan pesan error tampil
})
describe('User Login dengan username dan password berupa spasi', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com'; // Base URL aplikasi
  
    beforeEach(() => {
      // Kunjungi halaman login sebelum setiap tes
      cy.visit(baseUrl);
    });
  
it('Should not allow login with spaces as username and password', () => {
      // Isi username dengan spasi
      cy.get('input[name="username"]').type(' ');
      // Isi password dengan spasi
      cy.get('input[name="password"]').type(' ');
      cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as("messages");
      // Klik tombol Login
      cy.get('button[type="submit"]').click();

      // Verifikasi bahwa pesan error muncul
      cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]')
        .first()
        .should('have.text', 'Required');
    });
  });
it('User Login dengan dengan case-sensitive pada username/password', () => {
    // Mengunjungi halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]', { timeout: 10000 }).should('be.visible');
    cy.get('[name="username"]').type('admin');
    cy.get('[name="password"]').type('ADMIN123');
    cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as("messages");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@messages').its('response.statusCode').should('eq', 304);
    // Memverifikasi pesan error atau kondisi lain yang menunjukkan bahwa login tidak berhasil.
    cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');
  })
it('User Login dengan kombinasi username dan password salah', () => {
    // Mengunjungi halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('be.visible');
    cy.get('[name="username"]').type('user123');
    cy.get('[name="password"]').type('pass123');
    cy.intercept("GET","https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages").as("messages");
    cy.get('[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]').click();
    cy.wait('@messages').its('response.statusCode').should('eq', 304);
    // Memverifikasi pesan error atau kondisi lain yang menunjukkan bahwa login tidak berhasil.
    cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]').should('have.text','Invalid credentials');
  })
describe('User Validasi link Forgot your password?', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com';
  
    beforeEach(() => {
      // Navigate to the OrangeHRM login page
      cy.visit(baseUrl);
    });
  
    it('should validate "Forgot your password?" text and navigation', () => {
      // Validate the text is visible
      cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header')
        .should('be.visible')
        .and('contain.text', 'Forgot your password?');
      cy.intercept('GET', '/web/index.php/auth/requestPasswordResetCode').as('resetPasswordRequest');
  
      // Click the text and validate the navigation
      cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').click();
      cy.wait('@resetPasswordRequest').then((intercept) => {
        expect(intercept.response.statusCode).to.equal(200);
      });
      cy.url().should('include', '/auth/requestPasswordResetCode');
    });
  });
})
